module Network where

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
       (0.0,0.0), (1.0,0.0), (0.0,1.0), (1.0,1.0), (0.0,2.0), (1.0,2.0), (2.0,2.0)
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
