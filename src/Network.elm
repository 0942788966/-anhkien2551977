module Network where

import Color
import Graphics.Element exposing (Element)
import Graphics.Collage as GC
import Signal exposing (foldp)
import Time exposing (fps)

import IntDict exposing (IntDict)
import Graph exposing (Graph, Node, Edge, NodeContext, NodeId)

type alias Point = { x : Float, y : Float }

type alias Network = Graph Point Road

type alias Road = {
    length : Float,
    agents : List Agent
  }

type alias Agent = {
    kind      : AgentKind,
    speed     : Float,
    travelled : Float
  }

type AgentKind = Bus BusRoute

type alias BusRoute = IntDict NodeId

getOrFail : Maybe a -> a
getOrFail maybe =
  case maybe of
    Just something -> something

dist : Float -> Float -> Float
dist x y = sqrt (x^2 + y^2)

routeFromList : List NodeId -> IntDict NodeId
routeFromList x = case x of
  []    -> IntDict.empty
  n::ns -> IntDict.fromList <| List.map2 (,) (n::ns) (ns ++ [n])

example : Network
example =
  let bus = Bus <| routeFromList [1, 2, 7, 6, 5, 3]
      points = List.map (uncurry Point) [
       (0.0,0.0), (1.0,0.0), (0.0,1.0), (1.0,1.0), (0.0,2.0), (1.0,2.0), (2.25,2.0)
      ]
      nodes = List.map2 Node [1..7] points
      edge from to distance agents = Edge to from (Road distance agents)
      edges = [
       edge 1 2 1.0 [],
       edge 2 4 1.0 [],
       edge 2 7 (dist 1 2) [{kind = bus, speed = 0.005, travelled = 1.0}],
       edge 3 1 1.0 [],
       edge 3 4 1.0 [],
       edge 4 6 1.0 [],
       edge 5 3 1.0 [],
       edge 6 5 1.0 [],
       edge 7 6 1.0 []
      ]
  in
  Graph.fromNodesAndEdges nodes edges

along : Point -> Point -> Float -> Point
along p1 p2 fraction = { x = (1 - fraction) * p1.x + fraction * p2.x
                       , y = (1 - fraction) * p1.y + fraction * p2.y
                       }

agentPositions : Network -> List Point
agentPositions network =
  let go edge =
      let road = edge.label
          fromPoint = Graph.get edge.from network |> getOrFail |> .node |> .label
          toPoint = Graph.get edge.to network |> getOrFail |> .node |> .label
          length = road.length
          agents = road.agents
      in List.map (\a -> along fromPoint toPoint (a.travelled / length)) agents
  in List.concatMap go <| Graph.edges network


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
    agents = List.map (\pt -> GC.move (loc pt) <| GC.filled Color.red (GC.circle 10)) (agentPositions net)
  in
    GC.collage 1500 1500 <| roads ++ lines ++ agents

translate : Agent -> Agent
translate agent = { agent | travelled <- agent.travelled + agent.speed }

changeEdge : Agent -> NodeId -> NodeId
changeEdge agent nid = case agent.kind of
                         Bus route -> IntDict.get nid route |> getOrFail

updateContext : NodeContext Point Road -> NodeContext Point Road
updateContext ctx =
  let moveAgent from road agent =
        let moved = translate agent in
        if moved.travelled > road.length
        then ((ctx.node.id, changeEdge agent ctx.node.id), { agent | travelled <- 0 })
        else ((from, ctx.node.id), moved)
      movedAgents (from, road) = List.map (moveAgent from road) road.agents
      moved = IntDict.toList ctx.incoming |> List.concatMap movedAgents
      updateEdge edgeIds road =
        let check (e, a) = if e == edgeIds then Just a else Nothing in
        { road | agents <- List.filterMap check moved }
  in
    { ctx | incoming <- IntDict.map (\ nid road -> updateEdge (nid, ctx.node.id) road) ctx.incoming
          , outgoing <- IntDict.map (\ nid road -> updateEdge (ctx.node.id, nid) road) ctx.outgoing }

update : Network -> Network
update = Graph.mapContexts updateContext

main : Signal Element
main = 
  let initialState = example
      state = foldp (\tick s -> update s) initialState (fps 30)
  in
    Signal.map render state
