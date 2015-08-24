module Model where

import Array as A
import Effects
import Time exposing (Time)
import Debug
import Dict exposing (Dict)
import DraggableForm

import Graph exposing (NodeId)

import Types
import Network
import Levels
import GameScreens exposing (gameScreens, LevelParams, levelParamsList)

type ScreenState = TitleScreen 
                 | ChooseLevelScreen 
                 | LevelScreen Int
                 | MessageScreen Int
                 | EndLevelScreen Int

type GameTime = GameTime Int

incrementTime : GameTime -> GameTime
incrementTime curTime = (\(GameTime n) -> GameTime (n+1)) curTime

type Action = GoToScreen ScreenState
            | TickRealtime Time
            | ResetTime
            | ResetState
            | ToggleAdvancingTime
            | ChangeStopOrder StopDirection
            | EndLevel

type StopDirection = StopUp | StopDown | MakeActiveStopIndex Int

type alias LevelData = {
    state             : Types.State,
    networkGenerator  : Types.Input -> Types.Network,
    stops             : List BusStop,
    stopToNodeMapping : Dict String NodeId,
    activeStopIdx     : Maybe Int,
    changesRemaining  : Int,
    timeLimit         : GameTime
}

defaultLevelData : LevelData
defaultLevelData = {
    state             = Types.State (Levels.lvl1 [1, 3, 5]) Dict.empty,
    networkGenerator  = Levels.lvl1,
    stops             = [],
    stopToNodeMapping = Dict.empty,
    activeStopIdx     = Nothing,
    changesRemaining  = 0,
    timeLimit         = GameTime 10000
    }


type BusStop = BusStop String

type alias Model = {
    screen        : ScreenState,
    levelData     : LevelData,
    time          : GameTime,
    timeAdvancing : Bool,
    realtimeMs    : Float,
    counter       : Int,
    tickRate      : Int -- one game time tick every tickRate ms
}


initialModel: Model
initialModel = {
    screen        = TitleScreen,
    levelData     = defaultLevelData,
    time          = GameTime 0,
    timeAdvancing = False,
    realtimeMs    = 0,
    counter       = 0,
    tickRate      = 10
    }


levelDataForScreen : ScreenState -> LevelData
levelDataForScreen screen = case screen of
    LevelScreen n -> case A.get n levelParamsList of
        Just levelParams ->
            let
                stops = [BusStop "A", BusStop "B", BusStop "C"]
                stopsMapping = Dict.fromList [("A", 1), ("B", 3), ("C", 5)]
                changesRemaining = levelParams.changeLimit
            in  
               { defaultLevelData | stops <- stops, stopToNodeMapping <- stopsMapping, changesRemaining <- changesRemaining }
        Nothing -> defaultLevelData
    _ -> defaultLevelData

