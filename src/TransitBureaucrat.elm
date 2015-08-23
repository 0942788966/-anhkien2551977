module TransitBureaucrat where

import Html exposing (Html)
import StartApp exposing (start)
import Signal exposing (Address)
import Graphics.Element as G
import Effects as E
import Task
import Network

import Views exposing (..)
import Model exposing (..)

update : Action -> Model -> (Model, E.Effects Action)
update action oldModel =
  let
    newModel =  case action of
        GoToScreen newScreen -> { oldModel | screen <- newScreen }
        ToggleAdvancingTime -> { oldModel | timeAdvancing <- not oldModel.timeAdvancing }
        Tick t -> if oldModel.timeAdvancing
                  then { oldModel | time <- incrementTime oldModel.time,
                               network <- Network.update oldModel.network
                       }
                  else oldModel
  in (newModel, E.tick Tick)

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
