module Model where

type ScreenState = TitleScreen | ChooseLevelScreen | LevelScreen Int | MessageScreen Int

type Action = GoToScreen ScreenState
            | Tick

type alias Model = { numCars: Int, screen: ScreenState }

