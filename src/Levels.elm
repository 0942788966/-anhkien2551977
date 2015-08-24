module Levels where

import Color

import Graph exposing (Node, Edge)

import Types exposing (..)
import Helpers exposing (..)

lvl1 : Input -> Network
lvl1 busRoute =
  let node id (x,y) kind = Node id (Point (Coords x y) kind)
      edge from to distance agents = Edge from to (Road distance agents)

      r3 = sqrt 3

      nodes = [
        node 1 (r3, 3) (BusStop {label = "A", currentlyWaiting = 0.0, waitingDelta = 0.1}),
        node 2 (r3/2, 3/2) Intersection,
        node 3 (0, 0) (BusStop {label = "B", currentlyWaiting = 0.0, waitingDelta = 0.1}),
        node 4 (r3, 0) Intersection,
        node 5 (2*r3, 0) (BusStop {label = "C", currentlyWaiting = 0.0, waitingDelta = 0.1}),
        node 6 (3/2*r3, 3/2) Intersection,
        node 7 (r3, 1) (StopSign {delay = 8, currentDelay = 0})
      ]

      edgesWithoutBuses = [
       edge 1 2 r3 [],
       edge 2 3 r3 [],
       edge 3 4 r3 [],
       edge 4 5 r3 [],
       edge 5 6 r3 [],
       edge 6 1 r3 [],
       edge 2 7 1 [],
       edge 4 7 1 [],
       edge 6 7 1 [],
       edge 7 1 2 [],
       edge 7 3 2 [],
       edge 7 5 2 []
      ]

      networkWithoutBuses = Graph.fromNodesAndEdges nodes edgesWithoutBuses

      busKind = Bus (busRouteFromList busRoute networkWithoutBuses)
      bus = {kind = busKind, travelled = 0.0, totalDist = 0.0, speed = 0.05, color = Color.green, lastEdge = Nothing}

      edges = [
       edge 1 2 r3 [bus],
       edge 2 3 r3 [],
       edge 3 4 r3 [bus],
       edge 4 5 r3 [],
       edge 5 6 r3 [bus],
       edge 6 1 r3 [],
       edge 2 7 1 [],
       edge 4 7 1 [],
       edge 6 7 1 [],
       edge 7 1 2 [],
       edge 7 3 2 [],
       edge 7 5 2 []
      ]
  in
    Graph.fromNodesAndEdges nodes edges

lvl2 : Input -> Network
lvl2 busRoute =
  let carRouteUp = carRouteFromList [2, 4, 6]
      carRouteDown = carRouteFromList [5, 3, 1]

      node id (x,y) kind = Node id (Point (Coords x y) kind)
      edge from to distance agents = Edge from to (Road distance agents)

      nodes = [
        node 1 (0.0, 0.0) (BusStop {currentlyWaiting = 0.0, waitingDelta = 0.1}),
        node 2 (1.0, 0.0) (CarSpawner {route = carRouteUp, interval = 20, nextIn = 0, startEdge = (2, 4)}),
        node 3 (0.0, 1.0) (BusStop {currentlyWaiting = 0.0, waitingDelta = 0.2}),
        node 4 (1.0, 1.0) (StopSign {delay = 8, currentDelay = 0.0}),
        node 5 (0.0, 2.0) (CarSpawner {route = carRouteDown, interval = 20, nextIn = 0, startEdge = (5, 3)}),
        node 6 (1.0, 2.0) Intersection,
        node 7 (2.0, 2.0) (BusStop {currentlyWaiting = 0.0, waitingDelta = 0.1})
      ]
      
      edgesWithoutBuses = [
       edge 1 2 1.0 [],
       edge 2 4 1.0 [],
       edge 2 7 (dist 1 2) [],
       edge 3 1 1.0 [],
       edge 4 3 1.0 [],
       edge 4 6 1.0 [],
       edge 5 3 1.0 [],
       edge 6 5 1.0 [],
       edge 7 6 1.0 []
      ]

      networkWithoutBuses = Graph.fromNodesAndEdges nodes edgesWithoutBuses

      busKind = Bus (busRouteFromList busRoute networkWithoutBuses)
      bus = {kind = busKind, travelled = 0.0, totalDist = 0.0, speed = 0.04, color = Color.green, lastEdge = Nothing}

      edges = [
       edge 1 2 1.0 [bus],
       edge 2 4 1.0 [],
       edge 2 7 (dist 1 2) [],
       edge 3 1 1.0 [],
       edge 4 3 1.0 [],
       edge 4 6 1.0 [],
       edge 5 3 1.0 [],
       edge 6 5 1.0 [],
       edge 7 6 1.0 [bus]
      ]
  in
    Graph.fromNodesAndEdges nodes edges
