module Model where

import Array as A
import Effects
import Time exposing (Time)
import Debug
import Dict exposing (Dict)
import DraggableForm

import Graph exposing (NodeId)

import Helpers exposing (..)
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
    trackedMetrics    : List Types.TrackedMetric,
    stops             : List String,
    stopToNodeMapping : Dict String NodeId,
    activeStopIdx     : Maybe Int,
    changesRemaining  : Int,
    timeLimit         : GameTime,
    scalingFactor     : Float,
    coordScalingFactor: Float,
    globalTransform   : (Float, Float)
}

defaultLevelData : LevelData
defaultLevelData = {
    state             = Types.State (Levels.lvl1 [1, 3, 5]) Dict.empty,
    networkGenerator  = Levels.lvl1,
    stops             = [],
    stopToNodeMapping = Dict.empty,
    activeStopIdx     = Nothing,
    changesRemaining  = 0,
    timeLimit         = GameTime 10000,
    trackedMetrics    = [],
    scalingFactor     = 1.0,
    coordScalingFactor= 1.0,
    globalTransform   = (0, 0)
    }

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
        Just params -> let input = List.map (\s -> Dict.get s params.stopToNodeMapping |> getOrFail ("unknown bus stop " ++ s)) params.stops
                           state = Types.State (params.level input) Dict.empty
                         in 
                           { defaultLevelData | state <- state, 
                                                networkGenerator <- params.level,
                                                stops <- params.stops, 
                                                stopToNodeMapping <- params.stopToNodeMapping, 
                                                changesRemaining <- params.changeLimit,
                                                trackedMetrics <- params.trackedMetrics,
                                                scalingFactor <- params.scalingFactor,
                                                coordScalingFactor <- params.coordScalingFactor,
                                                globalTransform <- params.globalTransform }
        Nothing -> Debug.crash ("Level not found: " ++ toString n)
    _ -> defaultLevelData

