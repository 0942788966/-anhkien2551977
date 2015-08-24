module GameScreens where

import Array exposing (Array)
import Dict exposing (Dict)

import Graph exposing (NodeId)

import Types
import Levels

type GameScreenType = Message Int | Level Int

type alias LevelParams = { level: Types.Input -> Types.Network, changeLimit: Int, stops: List String, stopToNodeMapping: Dict String NodeId }

levelParamsList : Array LevelParams
levelParamsList = Array.fromList
    [
        {level = Levels.lvl1, changeLimit = 1, stops = ["A", "B", "C"], stopToNodeMapping = Dict.fromList [("A", 1), ("B", 3), ("C", 5)] },
        {level = Levels.lvl2, changeLimit = 1, stops = ["A", "B", "C"], stopToNodeMapping = Dict.fromList [("A", 7), ("B", 3), ("C", 1)] },
        {level = Levels.lvl3, changeLimit = 1, stops = ["A", "B", "C"], stopToNodeMapping = Dict.fromList [("A", 7), ("B", 3), ("C", 1)] }
    ]

gameScreens = [
        (Message 0, "Email"),
        (Level 0, "Monday Morning MTA Madness"),
        (Message 1, "Email"),
        (Level 1, "Rush Hour"),
        (Message 1, "Email"),
        (Level 2, "Big Map?")
    ]
