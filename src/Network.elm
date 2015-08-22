module Network where

import Color

import Graphics.Element exposing (Element)

import Graphics.Collage as GC

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

dist : Float -> Float -> Float
dist x y = sqrt (x^2 + y^2)

example : Network
example =
  let points = List.map (uncurry Point) [
       (0.0,0.0), (1.0,0.0), (0.0,1.0), (1.0,1.0), (0.0,2.0), (1.0,2.0), (2.25,2.0)
      ]
      nodes = List.map2 Node [1..7] points
      edge from to distance = Edge to from (Road distance [])
      edges = [
       edge 2 1 1.0,
       edge 2 4 1.0,
       edge 2 7 (dist 1 2),
       edge 3 1 1.0,
       edge 3 4 1.0,
       edge 4 6 1.0,
       edge 5 3 1.0,
       edge 6 5 1.0,
       edge 7 6 1.0
      ]
  in
  Graph.fromNodesAndEdges nodes edges

roadStyle : GC.LineStyle
roadStyle = let def = GC.defaultLine in
            { def | width <- size * 10, cap <- GC.Round }

lineStyle : GC.LineStyle
lineStyle = let def = GC.defaultLine in
            { def | width <- size / 2, cap <- GC.Round,
                             color <- Color.yellow, dashing <- [8 * round size, 4 * round size] }

size : Float
size = 2.5

loc : Point -> (Float, Float)
loc n = (size * 50 * n.x, size * 50 * n.y)

render : Network -> Element
render net =
  let
    getPair edge = case (Graph.get edge.from net, Graph.get edge.to net) of
                     (Just x, Just y) -> Just (x.node.label, y.node.label)
                     _                -> Nothing
    edgeNodePairs = Graph.edges net |> List.filterMap getPair
    edgeLines = List.map (\ (n1, n2) -> GC.segment (loc n1) (loc n2)) edgeNodePairs
  in
    let roads = List.map (GC.traced roadStyle) edgeLines
        lines = List.map (GC.traced lineStyle) edgeLines
    in
    GC.collage 1500 1500 <| roads ++ lines

main : Element
main = render example
