module GameScreens where

type GameScreenType = Message Int | Level Int

gameScreens = [
        (Message 0, "Email"),
        (Level 0, "Monday Morning MTA Madness")
    ]
