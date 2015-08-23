module Network where

import Color
import Graphics.Element exposing (Element)
import Graphics.Collage as GC
import Signal exposing (foldp)
import Time exposing (fps)

import Graph exposing (Graph, Node, Edge)

type alias Point = { x : Float, y : Float }

type alias Network = Graph Point Road

type alias Road = {
    length : Float,
    agents : List Agent
  }

type alias Agent = {
    kind      : AgentKind,
    travelled : Float
  }

type AgentKind = Bus

getOrFail : Maybe a -> a
getOrFail maybe =
  case maybe of
    Just something -> something

dist : Float -> Float -> Float
dist x y = sqrt (x^2 + y^2)

example : Network
example =
  let points = List.map (uncurry Point) [
       (0.0,0.0), (1.0,0.0), (0.0,1.0), (1.0,1.0), (0.0,2.0), (1.0,2.0), (2.25,2.0)
      ]
      nodes = List.map2 Node [1..7] points
      edge from to distance agents = Edge to from (Road distance agents)
      edges = [
       edge 2 1 1.0 [],
       edge 2 4 1.0 [],
       edge 2 7 (dist 1 2) [{kind = Bus, travelled = 1.0}],
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

updateEdge : Network -> Road -> Road
updateEdge net road =
  let agents = road.agents
      updatedAgents = List.map (\x -> {x | travelled <- x.travelled + 0.005}) agents
  in
    { road | agents <- updatedAgents }

update : Network -> Network
update net = Graph.mapEdges (updateEdge net) net

main : Signal Element
main = 
  let initialState = example
      state = foldp (\tick s -> update s) initialState (fps 30)
  in
    Signal.map render state
