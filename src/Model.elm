module Model where

import Effects
import Time exposing (Time)
import Network

type ScreenState = TitleScreen | ChooseLevelScreen | LevelScreen Int | MessageScreen Int

type GameTime = GameTime Int

incrementTime : GameTime -> GameTime
incrementTime curTime = (\(GameTime n) -> GameTime (n+1)) curTime

type Action = GoToScreen ScreenState
            | Tick Time
            | ToggleAdvancingTime

type alias Model = { numCars: Int,
                    screen: ScreenState,
                    time: GameTime,
                    timeAdvancing: Bool,
                    network: Network.Network
                   }

initialModel: Model
initialModel = {
        numCars = 0,
        screen = TitleScreen,
        time = GameTime 0,
        timeAdvancing = False,
        network = Network.example
    }

