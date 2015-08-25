module GameScreens where

import Array exposing (Array)
import Dict exposing (Dict)

import Graph exposing (NodeId)

import Helpers exposing (..)
import Types
import Levels

type GameScreenType = Message Int | Level Int

type alias LevelParams = { 
  level: Types.Input -> Types.Network, 
  changeLimit: Int, 
  stops: List String, 
  stopToNodeMapping: Dict String NodeId, 
  trackedMetrics: List Types.TrackedMetric,
  scalingFactor: Float,
  coordScalingFactor: Float,
  globalTransform: (Float, Float)
}

levelParamsList : Array LevelParams
levelParamsList = Array.fromList
    [
        { level = Levels.lvl1
        , changeLimit = 1
        , stops = ["A", "B", "C"]
        , stopToNodeMapping = Dict.fromList [("A", 1), ("B", 3), ("C", 5)] 
        , trackedMetrics = [{ displayName = "Bus Speed", metricName = "avgBusSpeed", isBadWhen = (\m -> m < 0.042), min = 0.04, max = 0.048 },
                            { displayName = "Avg Waiting Passengers", metricName = "avgWaiting", isBadWhen = (\m -> m > 15), min = 10, max = 20 }]
        , scalingFactor = 0.9
        , coordScalingFactor = 50
        , globalTransform = (-200.0, -100.0)
        },
        
        { level = Levels.lvl2
        , changeLimit = 1
        , stops = ["A", "B", "C"] 
        , stopToNodeMapping = Dict.fromList [("A", 7), ("B", 3), ("C", 1)] 
        , trackedMetrics = [{ displayName = "Avg Waiting Passengers", metricName = "avgWaiting", isBadWhen = (\m -> m > 70), min = 30, max = 90 }]
        , scalingFactor = 0.9
        , coordScalingFactor = 50
        , globalTransform = (-200.0, -100.0)
        },
        { level = Levels.lvl3
        , changeLimit = 1
        , stops = ["A", "B", "C", "D"]
        , stopToNodeMapping = Dict.fromList [("A", 8), ("B", 16), ("C", 25), ("D", 18)]
        , trackedMetrics = [{ displayName = "Avg Waiting Passengers", metricName = "avgWaiting", isBadWhen = (\m -> m > 143), min = 100, max = 150 }]
        , scalingFactor = 0.8
        , coordScalingFactor = 0.3
        , globalTransform = (0, 120.0)
        }
    ]

gameScreens = [
        (Message 0, "Email"),
        (Level 0, "Monday Morning MTA Madness"),
        (Message 1, "Email"),
        (Level 1, "Rush Hour"),
        (Message 2, "Email"),
        (Level 2, "A Big Big Map"),
        (Message 3, "The End")
    ]
