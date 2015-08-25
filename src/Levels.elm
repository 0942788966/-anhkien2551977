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
        node 1 (0.0, 0.0) (BusStop {label = "C", currentlyWaiting = 0.0, waitingDelta = 0.1}),
        node 2 (1.0, 0.0) (CarSpawner {route = carRouteUp, speed = 0.05, interval = 20, nextIn = 0, startEdge = (2, 4)}),
        node 3 (0.0, 1.0) (BusStop {label = "B", currentlyWaiting = 0.0, waitingDelta = 0.2}),
        node 4 (1.0, 1.0) (StopSign {delay = 8, currentDelay = 0.0}),
        node 5 (0.0, 2.0) (CarSpawner {route = carRouteDown, speed = 0.05, interval = 20, nextIn = 0, startEdge = (5, 3)}),
        node 6 (1.0, 2.0) Intersection,
        node 7 (2.0, 2.0) (BusStop {label = "A", currentlyWaiting = 0.0, waitingDelta = 0.1})
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

lvl3 : Input -> Network
lvl3 input =
  let carRoute1 = carRouteFromList [1, 5, 8, 10, 11, 12]
      carRoute3 = carRouteFromList [3, 10, 19, 23, 26]

      nodes =
        [ { id = 1, label =  { coords = { x = -350, y = -300 }, kind = (CarSpawner {route = carRoute1, speed = 4, interval = 20, nextIn = 0, startEdge = (1, 5)}) } }
        , { id = 2, label =  { coords = { x = -350, y = -200 }, kind = Intersection } }
        , { id = 3, label =  { coords = { x = -350, y = 0    }, kind = (CarSpawner {route = carRoute3, speed = 4, interval = 20, nextIn = 0, startEdge = (3, 10)}) } }
        , { id = 4, label =  { coords = { x = -350, y = 250  }, kind = Intersection } }
        , { id = 5, label =  { coords = { x = -250, y = -300 }, kind = Intersection } }
        , { id = 6, label =  { coords = { x = -250, y = -200 }, kind = Intersection } }
        , { id = 7, label =  { coords = { x = -250, y = 100  }, kind = Intersection } }
        , { id = 8, label =  { coords = { x = -150, y = -200 }, kind = BusStop {label = "A", currentlyWaiting = 0.0, waitingDelta = 0.1} } }
        , { id = 9, label =  { coords = { x = -100, y = -400 }, kind = Intersection } }
        , { id = 10, label = { coords = { x = -100, y = -100 }, kind = StopSign {delay = 8, currentDelay = 0.0} } }
        , { id = 11, label = { coords = { x = -100, y = 0    }, kind = Intersection } }
        , { id = 12, label = { coords = { x = -100, y = 100  }, kind = Intersection } }
        , { id = 13, label = { coords = { x = 0,    y = -100 }, kind = Intersection } }
        , { id = 14, label = { coords = { x = 0,    y = 0    }, kind = Intersection } }
        , { id = 15, label = { coords = { x = 50,   y = -350 }, kind = Intersection } }
        , { id = 16, label = { coords = { x = 50,   y = -200 }, kind = BusStop {label = "B", currentlyWaiting = 0.0, waitingDelta = 0.1} } }
        , { id = 17, label = { coords = { x = 100,  y = -300 }, kind = Intersection } }
        , { id = 18, label = { coords = { x = 100,  y = -100 }, kind = BusStop {label = "D", currentlyWaiting = 0.0, waitingDelta = 0.1} } }
        , { id = 19, label = { coords = { x = 100,  y = 0    }, kind = StopSign {delay = 8, currentDelay = 0.0} } }
        , { id = 20, label = { coords = { x = 150,  y = -200 }, kind = StopSign {delay = 8, currentDelay = 0.0} } }
        , { id = 21, label = { coords = { x = 200,  y = -100 }, kind = Intersection } }
        , { id = 22, label = { coords = { x = 200,  y = 0    }, kind = Intersection } }
        , { id = 23, label = { coords = { x = 200,  y = 100  }, kind = Intersection } }
        , { id = 24, label = { coords = { x = 300,  y = -100 }, kind = Intersection } }
        , { id = 25, label = { coords = { x = 300,  y = 0    }, kind = BusStop {label = "C", currentlyWaiting = 0.0, waitingDelta = 0.1} } }
        , { id = 26, label = { coords = { x = 300,  y = 100  }, kind = Intersection } }
        ]
      edgesWithoutBuses =
        [ { from = 26, label = { agents = [], length = 100                }, to = 25 }
        , { from = 25, label = { agents = [], length = 100                }, to = 24 }
        , { from = 24, label = { agents = [], length = 100                }, to = 21 }
        , { from = 23, label = { agents = [], length = 100                }, to = 26 }
        , { from = 22, label = { agents = [], length = 100                }, to = 25 }
        , { from = 21, label = { agents = [], length = 100                }, to = 18 }
        , { from = 20, label = { agents = [], length = 180.27756377319946 }, to = 24 }
        , { from = 19, label = { agents = [], length = 141.4213562373095  }, to = 23 }
        , { from = 19, label = { agents = [], length = 100                }, to = 22 }
        , { from = 18, label = { agents = [], length = 100                }, to = 13 }
        , { from = 17, label = { agents = [], length = 111.80339887498948 }, to = 20 }
        , { from = 17, label = { agents = [], length = 111.80339887498948 }, to = 16 }
        , { from = 16, label = { agents = [], length = 100                }, to = 20 }
        , { from = 16, label = { agents = [], length = 180.27756377319946 }, to = 10 }
        , { from = 16, label = { agents = [], length = 200                }, to = 8  }
        , { from = 15, label = { agents = [], length = 70.71067811865476  }, to = 17 }
        , { from = 14, label = { agents = [], length = 100                }, to = 19 }
        , { from = 13, label = { agents = [], length = 100                }, to = 10 }
        , { from = 12, label = { agents = [], length = 150                }, to = 7  }
        , { from = 11, label = { agents = [], length = 100                }, to = 14 }
        , { from = 11, label = { agents = [], length = 100                }, to = 12 }
        , { from = 11, label = { agents = [], length = 180.27756377319946 }, to = 7  }
        , { from = 11, label = { agents = [], length = 250                }, to = 3  }
        , { from = 10, label = { agents = [], length = 223                }, to = 19 }
        , { from = 10, label = { agents = [], length = 100                }, to = 11 }
        , { from = 9, label =  { agents = [], length = 158.11388300841898 }, to = 15 }
        , { from = 8, label =  { agents = [], length = 250                }, to = 15 }
        , { from = 8, label =  { agents = [], length = 111.80339887498948 }, to = 10 }
        , { from = 8, label =  { agents = [], length = 206.15528128088303 }, to = 9  }
        , { from = 7, label =  { agents = [], length = 180.27756377319946 }, to = 4  }
        , { from = 6, label =  { agents = [], length = 100                }, to = 8  }
        , { from = 6, label =  { agents = [], length = 100                }, to = 5  }
        , { from = 5, label =  { agents = [], length = 141.4213562373095  }, to = 8  }
        , { from = 4, label =  { agents = [], length = 250                }, to = 3  }
        , { from = 3, label =  { agents = [], length = 269.2582403567252  }, to = 10 }
        , { from = 3, label =  { agents = [], length = 282.842712474619   }, to = 8  }
        , { from = 3, label =  { agents = [], length = 200                }, to = 2  }
        , { from = 2, label =  { agents = [], length = 100                }, to = 6  }
        , { from = 2, label =  { agents = [], length = 100                }, to = 1  }
        , { from = 1, label =  { agents = [], length = 100                }, to = 5  }
        ]


      networkWithoutBuses = Graph.fromNodesAndEdges nodes edgesWithoutBuses

      busKind = Bus (busRouteFromList input networkWithoutBuses)
      bus = {kind = busKind, travelled = 0.0, totalDist = 0.0, speed = 4, color = Color.green, lastEdge = Nothing}

      edges =
        [ { from = 26, label = { agents = [], length = 100                }, to = 25 }
        , { from = 25, label = { agents = [], length = 100                }, to = 24 }
        , { from = 24, label = { agents = [], length = 100                }, to = 21 }
        , { from = 23, label = { agents = [], length = 100                }, to = 26 }
        , { from = 22, label = { agents = [], length = 100                }, to = 25 }
        , { from = 21, label = { agents = [], length = 100                }, to = 18 }
        , { from = 20, label = { agents = [], length = 180.27756377319946 }, to = 24 }
        , { from = 19, label = { agents = [], length = 141.4213562373095  }, to = 23 }
        , { from = 19, label = { agents = [], length = 100                }, to = 22 }
        , { from = 18, label = { agents = [], length = 100                }, to = 13 }
        , { from = 17, label = { agents = [], length = 111.80339887498948 }, to = 20 }
        , { from = 17, label = { agents = [], length = 111.80339887498948 }, to = 16 }
        , { from = 16, label = { agents = [], length = 100                }, to = 20 }
        , { from = 16, label = { agents = [], length = 180.27756377319946 }, to = 10 }
        , { from = 16, label = { agents = [], length = 200                }, to = 8  }
        , { from = 15, label = { agents = [], length = 70.71067811865476  }, to = 17 }
        , { from = 14, label = { agents = [], length = 100                }, to = 19 }
        , { from = 13, label = { agents = [], length = 100                }, to = 10 }
        , { from = 12, label = { agents = [], length = 150                }, to = 7  }
        , { from = 11, label = { agents = [], length = 100                }, to = 14 }
        , { from = 11, label = { agents = [], length = 100                }, to = 12 }
        , { from = 11, label = { agents = [], length = 180.27756377319946 }, to = 7  }
        , { from = 11, label = { agents = [], length = 250                }, to = 3  }
        , { from = 10, label = { agents = [], length = 223                }, to = 19 }
        , { from = 10, label = { agents = [], length = 100                }, to = 11 }
        , { from = 9, label =  { agents = [], length = 158.11388300841898 }, to = 15 }
        , { from = 8, label =  { agents = [bus], length = 250                }, to = 15 }
        , { from = 8, label =  { agents = [], length = 111.80339887498948 }, to = 10 }
        , { from = 8, label =  { agents = [], length = 206.15528128088303 }, to = 9  }
        , { from = 7, label =  { agents = [], length = 180.27756377319946 }, to = 4  }
        , { from = 6, label =  { agents = [], length = 100                }, to = 8  }
        , { from = 6, label =  { agents = [], length = 100                }, to = 5  }
        , { from = 5, label =  { agents = [], length = 141.4213562373095  }, to = 8  }
        , { from = 4, label =  { agents = [], length = 250                }, to = 3  }
        , { from = 3, label =  { agents = [], length = 269.2582403567252  }, to = 10 }
        , { from = 3, label =  { agents = [], length = 282.842712474619   }, to = 8  }
        , { from = 3, label =  { agents = [], length = 200                }, to = 2  }
        , { from = 2, label =  { agents = [], length = 100                }, to = 6  }
        , { from = 2, label =  { agents = [], length = 100                }, to = 1  }
        , { from = 1, label =  { agents = [], length = 100                }, to = 5  }
        ]
  in Graph.fromNodesAndEdges nodes edges
