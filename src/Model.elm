module Model where

import Effects
import Time exposing (Time)
import Debug
import Dict

import Types
import Network

type ScreenState = TitleScreen | ChooseLevelScreen | LevelScreen Int | MessageScreen Int

type GameTime = GameTime Int

incrementTime : GameTime -> GameTime
incrementTime curTime = (\(GameTime n) -> GameTime (n+1)) curTime

type Action = GoToScreen ScreenState
            | TickRealtime Time
            | ResetTime
            | ToggleAdvancingTime
            | ChangeStopOrder

type alias LevelData = {
    stops: List BusStop
}

type BusStop = BusStop String

type alias Model = {
                    screen: ScreenState,
                    levelData: LevelData,
                    time: GameTime,
                    timeAdvancing: Bool,
                    network: Types.State,
                    realtimeMs: Float,
                    counter: Int,
                    tickRate : Int -- one game time tick every tickRate ms
                   }


initialModel: Model
initialModel = {
        screen = TitleScreen,
        levelData = { stops = [] },
        time = GameTime 0,
        timeAdvancing = False,
        network = Types.State Network.example Dict.empty,
        realtimeMs = 0,
        counter = 0,
        tickRate = 10
    }


levelDataForScreen : ScreenState -> LevelData
levelDataForScreen screen = case screen of
    LevelScreen n -> { stops = [BusStop "A", BusStop "B", BusStop "C", BusStop "D"] }
    _ -> { stops = [] }

