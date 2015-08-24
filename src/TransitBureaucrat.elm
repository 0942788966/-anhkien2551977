module TransitBureaucrat where

import Debug
import Html exposing (Html)
import StartApp exposing (start)
import Signal exposing (Address)
import Graphics.Element as G
import Effects as E
import Task
import Time
import Dict

import Network
import Types
import Views exposing (..)
import Model exposing (..)
import Helpers exposing (getOrFail, moveIthMemberUp, moveIthMemberDown)
import Levels

updateStopOrder : StopDirection -> Model ->  Model
updateStopOrder sd oldModel =
    if oldModel.levelData.changesRemaining == 0
    then oldModel
    else let
        oldLevelData = oldModel.levelData
        newLevelData =
            case sd of
                StopUp -> case oldLevelData.activeStopIdx of
                    Just i -> { oldLevelData | stops <- moveIthMemberUp i oldLevelData.stops,
                                               activeStopIdx <- Nothing,
                                               changesRemaining <- (oldLevelData.changesRemaining - 1)
                              }
                    Nothing -> oldLevelData
                StopDown -> case oldLevelData.activeStopIdx of
                    Just i -> { oldLevelData | stops <- moveIthMemberDown i oldLevelData.stops,
                                               activeStopIdx <- Nothing,
                                               changesRemaining <- (oldLevelData.changesRemaining - 1)
                               }
                    Nothing -> oldLevelData
                MakeActiveStopIndex i -> { oldLevelData | activeStopIdx <- Just i }
        in { oldModel | levelData <- newLevelData }

update : Action -> Model -> (Model, E.Effects Action)
update action oldModel =
  let
    readyForNewGameTick counter = counter >= oldModel.tickRate

    newModel : Model
    newModel = case action of
        ChangeStopOrder sd ->  updateStopOrder sd oldModel
        GoToScreen newScreen -> { oldModel | screen <- newScreen,
                                             levelData <- levelDataForScreen newScreen

                                 }
        ToggleAdvancingTime -> { oldModel | timeAdvancing <- not oldModel.timeAdvancing }
        TickRealtime t ->
            if readyForNewGameTick oldModel.counter
            then
                let newTime = if oldModel.timeAdvancing then incrementTime oldModel.time else oldModel.time

                    oldLevelData = oldModel.levelData

                    newState = if oldModel.timeAdvancing
                               then Network.update oldLevelData.state
                               else oldLevelData.state

                    newLevelData = { oldLevelData | state <- newState }

                in  { oldModel | time <- newTime,
                                 levelData <- newLevelData,
                                 counter <- 0
                    }
            else
                { oldModel | realtimeMs <- Time.inMilliseconds t,
                             counter <- oldModel.counter + (floor <| Time.inMilliseconds t - oldModel.realtimeMs)
                }
        ResetTime -> { oldModel | realtimeMs <- 0,
                                  time <- GameTime 0,
                                  timeAdvancing <- False,
                                  counter <- 0,
                                  levelData <- resetStateInLevelData oldModel.levelData
                     }

        ResetState -> { oldModel | realtimeMs <- 0,
                                  time <- GameTime 0,
                                  timeAdvancing <- False,
                                  counter <- 0,
                                  levelData <- levelDataForScreen oldModel.screen
                     }

        EndLevel ->
          let level = case oldModel.screen of
                        TitleScreen       -> 0
                        ChooseLevelScreen -> 0
                        LevelScreen i     -> i
                        MessageScreen i   -> i
                        EndLevelScreen i  -> i
          in
            if levelPassed oldModel
            then { oldModel | realtimeMs <- 0,
                              time <- GameTime 0,
                              timeAdvancing <- False,
                              counter <- 0,
                              levelData <- levelDataForScreen oldModel.screen,
                              screen <- EndLevelScreen level }
            else { oldModel | realtimeMs <- 0,
                              time <- GameTime 0,
                              timeAdvancing <- False,
                              counter <- 0,
                              levelData <- levelDataForScreen oldModel.screen,}

  in (newModel, E.tick TickRealtime)

resetStateInLevelData : LevelData -> LevelData
resetStateInLevelData levelData =
  let input = List.map (\(BusStop s) -> Dict.get s levelData.stopToNodeMapping |> getOrFail ("unknown bus stop " ++ s ++ " : " ++ toString levelData.stopToNodeMapping)) levelData.stops
      network = levelData.networkGenerator input
  in
    { levelData | state <- Types.State network Dict.empty }


view : Address Action -> Model -> Html
view address model = case model.screen of
    TitleScreen       ->  renderTitleScreen address
    ChooseLevelScreen -> renderChooseLevel address model
    MessageScreen n   -> renderMessageScreen n address
    LevelScreen n     -> renderLevel n address model
    EndLevelScreen n  -> renderEndLevel n

app = start { init = (initialModel, E.none), update = update, view = view, inputs = [] }

main = app.html

port tasks : Signal (Task.Task E.Never ())
port tasks =
      app.tasks
