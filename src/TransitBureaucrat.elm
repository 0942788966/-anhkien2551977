module TransitBureaucrat where

import Html exposing (Html)
import StartApp.Simple exposing (start)
import Signal exposing (Address)
import Graphics.Element as G

import Views exposing (..)
import Model exposing (..)

initialModel : Model
initialModel =  { numCars = 0, screen = TitleScreen }

update : Action -> Model -> Model
update action oldModel =  case action of
    GoToScreen newScreen -> { oldModel | screen <- newScreen }
    _ -> oldModel

view : Address Action -> Model -> Html
view address model = case model.screen of
    TitleScreen ->  renderTitleScreen address
    ChooseLevelScreen -> renderChooseLevel address model
    MessageScreen n -> renderMessageScreen n address
    LevelScreen n -> renderLevel n address model

main = start
        { model = initialModel, update = update, view = view }

