module GameScreens where

import Array exposing (Array)

type GameScreenType = Message Int | Level Int

type alias LevelParams =
    { changeLimit: Int }

levelParamsList : Array LevelParams
levelParamsList = Array.fromList
    [
        {changeLimit = 1}
    ]

gameScreens = [
        (Message 0, "Email"),
        (Level 0, "Monday Morning MTA Madness")
    ]
