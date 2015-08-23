module Model where

import Effects
import Time exposing (Time)

type ScreenState = TitleScreen | ChooseLevelScreen | LevelScreen Int | MessageScreen Int

type GameTime = GameTime Int

type Action = GoToScreen ScreenState
            | Tick Time
            | ToggleAdvancingTime

type alias Model = { numCars: Int,
                    screen: ScreenState,
                    time: GameTime,
                    timeAdvancing: Bool
                   }

initialModel: Model
initialModel = {
        numCars = 0,
        screen = TitleScreen,
        time = GameTime 40,
        timeAdvancing = False
    }
