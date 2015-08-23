module Network where

import Color exposing (Color)
import Graphics.Element exposing (Element, show, flow, down)
import Graphics.Collage as GC
import Signal exposing (foldp)
import Time exposing (fps)

import IntDict exposing (IntDict)
import Graph exposing (Graph, Node, Edge, NodeContext, NodeId)

import Debug

type alias Point = { x : Float, y : Float }

type alias Network = Graph Point Road

type alias Road = {
    length : Float,
    agents : List Agent
  }

type alias Agent = {
    kind      : AgentKind,
    speed     : Float,
    travelled : Float,
    color     : Color
  }

type AgentKind = Bus BusRoute

type alias BusRoute = IntDict NodeId

getOrFail : String -> Maybe a -> a
getOrFail ex maybe =
  case maybe of
    Just something -> something
    Nothing -> Debug.crash ex

dist : Float -> Float -> Float
dist x y = sqrt (x^2 + y^2)

routeFromList : List NodeId -> IntDict NodeId
routeFromList x = case x of
  []    -> IntDict.empty
  n::ns -> IntDict.fromList <| List.map2 (,) (n::ns) (ns ++ [n])

example : Network
example =
  let bus = Bus <| routeFromList [1, 2, 7, 6, 5, 3]
      bus2 = Bus <| routeFromList [6, 5, 3, 4]
      points = List.map (uncurry Point) [
       (0.0,0.0), (1.0,0.0), (0.0,1.0), (1.0,1.0), (0.0,2.0), (1.0,2.0), (2.25,2.0)
      ]
      nodes = List.map2 Node [1..7] points
      edge from to distance agents = Edge from to (Road distance agents)
      edges = [
       edge 1 2 1.0 [{kind = bus, travelled = 0.0, speed = 0.04, color = Color.green}],
       edge 2 4 1.0 [],
       edge 2 7 (dist 1 2) [],
       edge 3 1 1.0 [],
       edge 3 4 1.0 [],
       edge 4 6 1.0 [{kind = bus2, travelled = 0.0, speed = 0.05, color = Color.blue}],
       edge 5 3 1.0 [{kind = bus2, travelled = 0.0, speed = 0.05, color = Color.red}],
       edge 6 5 1.0 [{kind = bus, travelled = 0.0, speed = 0.08, color = Color.orange}],
       edge 7 6 1.0 []
      ]
  in
  Graph.fromNodesAndEdges nodes edges

along : Point -> Point -> Float -> Point
along p1 p2 fraction = { x = (1 - fraction) * p1.x + fraction * p2.x
                       , y = (1 - fraction) * p1.y + fraction * p2.y
                       }

agentPositions : Network -> List (Point, Agent)
agentPositions network =
  let go edge =
      let road = edge.label
          fromPoint = Graph.get edge.from network |> getOrFail "can't find fromPoint" |> .node |> .label
          toPoint = Graph.get edge.to network |> getOrFail "can't find toPoint" |> .node |> .label
          length = road.length
          agents = road.agents
      in List.map (\a -> (along fromPoint toPoint (a.travelled / length), a)) agents
  in (List.concatMap go <| Graph.edges network) |> Debug.watch "agentPositions"

roadStyle : GC.LineStyle
roadStyle = let def = GC.defaultLine in
            { def | width <- size * 10, cap <- GC.Round }

medianStyle : GC.LineStyle
medianStyle = let def = GC.defaultLine in
            { def | width <- size / 2,
                    cap <- GC.Round,
                    color <- Color.yellow,
                    dashing <- [8 * round size, 4 * round size] }

size : Float
size = 2.5

padding : Float
padding = 0.12

loc : Point -> (Float, Float)
loc n = (size * 50 * n.x, size * 50 * n.y)

getNodes : Network -> Edge Road -> Maybe (Point, Point)
getNodes net edge = case (Graph.get edge.from net, Graph.get edge.to net) of
                      (Just x, Just y) -> Just (x.node.label, y.node.label)
                      _                -> Nothing


render : Network -> Element
render net =
  let
    edgeNodePairs = Graph.edges net |> List.filterMap (getNodes net)
    edgeLines = List.map (\ (n1, n2) -> GC.segment (loc n1) (loc n2)) edgeNodePairs

    roads = List.map (GC.traced roadStyle) edgeLines
    lines = List.map (GC.traced medianStyle) edgeLines
    agents = List.map (\(pt, a) -> GC.move (loc pt) <| GC.filled a.color (GC.circle 10)) (agentPositions net)
  in
    GC.collage 800 800 <| roads ++ lines ++ agents

translate : Agent -> Float -> Agent
translate agent maxTravelled =
  let limit = maxTravelled - padding in
  { agent | travelled <- min (agent.travelled + agent.speed) limit }

changeEdge : Agent -> NodeId -> NodeId
changeEdge agent nid = case agent.kind of
                         Bus route -> IntDict.get nid route |> getOrFail ("Bus can't find where to go after node " ++ (toString nid) ++ " in " ++ (toString <| IntDict.toList route))

moveAgent ctx from road agent maxTravelled =
  let moved = translate agent maxTravelled
  in
    if moved.travelled > road.length
    then let remainder = moved.travelled - road.length in
         ((ctx.node.id, changeEdge agent ctx.node.id), { agent | travelled <- remainder })
    else ((from, ctx.node.id), moved)

moveAgents : NodeContext Point Road -> List ((NodeId, NodeId), Agent)
moveAgents ctx =
  let moveRoad (from, road) =
    let go agent calculated =
      let onEdge = List.filter (\ ((f, _), _) -> f == from) calculated |> List.map snd
          max = (Maybe.withDefault (1/0) <| List.head <| List.map .travelled onEdge) |> Debug.watch "max"
      in
      moveAgent ctx from road agent max :: calculated
    in
    List.foldl go [] <| List.reverse <| List.sortBy .travelled road.agents
  in
  IntDict.toList ctx.incoming |> List.concatMap moveRoad

updateContext : NodeContext Point Road -> (List (Edge Road), List (Edge Road))
updateContext ctx =
  let moved = moveAgents ctx

      updateEdge edgeIds road =
        let check (e, a) = if e == edgeIds then Just a else Nothing in
        { road | agents <- List.filterMap check moved }

      newIncoming = IntDict.map (\ nid road -> updateEdge (nid, ctx.node.id) road) ctx.incoming
      newOutgoing = IntDict.map (\ nid road -> updateEdge (ctx.node.id, nid) road) ctx.outgoing

      newIncomingEdges = IntDict.toList newIncoming |> List.map (\(from,label) -> {from = from, to = ctx.node.id, label = label} )
      newOutgoingEdges = IntDict.toList newOutgoing |> List.map (\(to,label) -> {from = ctx.node.id, to = to, label = label} )
  in
    (newIncomingEdges, newOutgoingEdges)

update : Network -> Network
update net =
  let go ctx (ins, outs) = let (in', out') = updateContext ctx in (ins ++ in', outs ++ out')
      (ins, outs) = Graph.fold go ([], []) net
      -- TODO: find collisions at corners as an extra pass through outs
      mergedEdges = let intsToInt x y = 2^x * 3^y
                        insDict = IntDict.fromList <| List.map (\e -> (intsToInt e.from e.to, e)) ins
                        outDict = IntDict.fromList <| List.map (\e -> (intsToInt e.from e.to, e)) outs
                        united = IntDict.uniteWith (\key inE outE -> let inElabel = inE.label in {inE | label <- {inElabel | agents <- inE.label.agents ++ outE.label.agents}} ) insDict outDict
                    in
                      IntDict.values united
  in
    Graph.fromNodesAndEdges (Graph.nodes net) mergedEdges

main : Signal Element
main =
  let initialState = example
      state = foldp (\tick s -> update s) initialState (fps 30)
  in
    Signal.map render state

watchIf : String -> Bool -> a -> a
watchIf str bool value =
  if bool then Debug.watch str value else value
