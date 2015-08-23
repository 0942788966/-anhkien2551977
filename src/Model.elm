module Model where

type ScreenState = TitleScreen | ChooseLevelScreen | LevelScreen Int | MessageScreen Int

type GameTime = GameTime Int

type Action = GoToScreen ScreenState
            | Tick

type alias Model = { numCars: Int,
                    screen: ScreenState,
                    time: GameTime,
                    timeAdvancing: Bool
                   }

initialModel: Model
initialModel = {
        numCars = 0,
        screen = TitleScreen,
        time = GameTime 0,
        timeAdvancing = False
    }
