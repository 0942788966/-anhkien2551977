module GameScreens where

import Array exposing (Array)
import Dict exposing (Dict)

import Graph exposing (NodeId)

import Helpers exposing (..)
import Types
import Levels

type GameScreenType = Message Int | Level Int

type alias LevelParams = { level: Types.Input -> Types.Network, changeLimit: Int, stops: List String, stopToNodeMapping: Dict String NodeId, trackedMetrics: List Types.TrackedMetric }

levelParamsList : Array LevelParams
levelParamsList = Array.fromList
    [
        { level = Levels.lvl1
        , changeLimit = 1
        , stops = ["A", "B", "C"]
        , stopToNodeMapping = Dict.fromList [("A", 1), ("B", 3), ("C", 5)] 
        , trackedMetrics = [{ displayName = "Bus Speed", metricName = "avgBusSpeed", isBadWhen = (\m -> m < 0.42), min = 0.4, max = 0.45 },
                            { displayName = "Avg Waiting Passengers", metricName = "avgWaiting", isBadWhen = (\m -> m > 15), min = 10, max = 20 }]
        },
        
        { level = Levels.lvl2
        , changeLimit = 1
        , stops = ["A", "B", "C"] 
        , stopToNodeMapping = Dict.fromList [("A", 7), ("B", 3), ("C", 1)] 
        , trackedMetrics = []
        }
    ]

gameScreens = [
        (Message 0, "Email"),
        (Level 0, "Monday Morning MTA Madness"),
        (Message 1, "Email"),
        (Level 1, "Rush Hour")
    ]
