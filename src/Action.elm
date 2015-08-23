module Action where

type ScreenState = TitleScreen | ChooseLevelScreen | LevelScreen Int | MessageScreen Int

type Action = GoToScreen ScreenState
            | Tick

