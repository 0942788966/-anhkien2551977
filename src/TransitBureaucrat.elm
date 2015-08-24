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

update : Action -> Model -> (Model, E.Effects Action)
update action oldModel =
  let
    readyForNewGameTick counter = counter >= oldModel.tickRate

    newModel : Model
    newModel = case action of
        GoToScreen newScreen -> { oldModel | screen <- newScreen,
                                             levelData <- levelDataForScreen newScreen
   
                                 }
        ToggleAdvancingTime -> { oldModel | timeAdvancing <- not oldModel.timeAdvancing }
        TickRealtime t ->
            if readyForNewGameTick oldModel.counter
            then
                let newTime = if oldModel.timeAdvancing then incrementTime oldModel.time else oldModel.time

                    newNetwork : Types.State
                    newNetwork = if oldModel.timeAdvancing
                                 then Network.update oldModel.network
                                 else oldModel.network

                in  { oldModel | time <- newTime,
                                 network <- newNetwork,
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
                                  network <- (Types.State Network.example Dict.empty)
                     }


  in (newModel, E.tick TickRealtime)


view : Address Action -> Model -> Html
view address model = case model.screen of
    TitleScreen ->  renderTitleScreen address
    ChooseLevelScreen -> renderChooseLevel address model
    MessageScreen n -> renderMessageScreen n address
    LevelScreen n -> renderLevel n address model

app = start { init = (initialModel, E.none), update = update, view = view, inputs = [] }

main = app.html

port tasks : Signal (Task.Task E.Never ())
port tasks =
      app.tasks
