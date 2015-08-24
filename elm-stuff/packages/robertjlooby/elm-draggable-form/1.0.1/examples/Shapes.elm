module Shapes where

import Color exposing (black, blue, green)
import DraggableForm as DF
import Graphics.Collage exposing (collage)
import Graphics.Element exposing (Element)
import Mouse
import Signal exposing ((<~), (~))
import Window


-- Model

type alias Model =
  { draggableForms : DF.Model
  }


initialState : Model
initialState =
  {
    draggableForms =
      { forms =
          [ DF.createCircle green 100 (50, 50) 0
          , DF.createCircle blue 150 (50, 50) 0
          , DF.createSquare black 200 (-50, -50) 2
          ]
      , selectedId = Nothing
      }
  }


-- Update

type Action
  = MouseMove (Int, Int)
  | ChangeSelection Bool (Int, Int) (Int, Int)


update : Action -> Model -> Model
update action model =
  case action of
    MouseMove newPosition ->
      { model | draggableForms <- DF.update (DF.MoveSelected newPosition) model.draggableForms }
    ChangeSelection True mousePosition dimensions ->
      let position = relativePosition dimensions mousePosition
      in
          { model | draggableForms <- DF.update (DF.ChangeSelection position) model.draggableForms }
    ChangeSelection False _ _ ->
      { model | draggableForms <- DF.update DF.UnselectAll model.draggableForms }


relativePosition : (Int, Int) -> (Int, Int) -> (Int, Int)
relativePosition (w, h) (x, y) =  (x - w // 2, h // 2 - y)


-- View

view : (Int, Int) -> Model -> Element
view (w, h) model =
  let
    forms = DF.render model.draggableForms
  in
    collage w h forms


---- Inputs ----

main : Signal Element
main =
  let
    model = Signal.foldp update initialState events
  in
    view <~ Window.dimensions ~ model


events : Signal Action
events = Signal.mergeMany
           [ MouseMove <~ (relativePosition <~ Window.dimensions ~ Mouse.position)
           , ChangeSelection <~ Mouse.isDown ~ Mouse.position ~ Window.dimensions
           ]
