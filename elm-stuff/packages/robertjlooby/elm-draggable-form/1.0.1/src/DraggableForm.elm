module DraggableForm (Model, DraggableForm, Action(..), render, update, createCircle, createSquare) where

{-| This package is used to create and update drag and drop forms that can
be moved around a canvas.

# Models
@docs Model, DraggableForm

# Updating
@docs Action, update

# Viewing
@docs render

# Model Helpers
@docs createCircle, createSquare

-}

import Color exposing (Color)
import Graphics.Collage exposing (Form, circle, filled, move, square)


--Model

{-| The Model consists of a List of DraggableForms and the id of the currently
selected form.

    { forms = [ draggableForm ], selectedId = Nothing }

-}

type alias Model =
  { forms : List DraggableForm
  , selectedId : Maybe Int
  }


{-| The DraggableForm consists of a Graphics.Collage.Form that represents the
actual Form to be rendered, an id (forms with the same id will be dragged
around together), a position on the canvas, and a function that can be used
to determine if a point on the canvas is inside that form. There are helper
methods below for creating DraggableForms of common shapes.
-}

type alias DraggableForm =
  { form : Form
  , id : Int
  , isPointInside : (Int, Int) -> (Int, Int) -> Bool
  , position : (Int, Int)
  }


{-| Can be used to create a circle DraggableForm. Takes the Color of the
circle, the radius, the starting position, and the id.

    createCircle Color.blue 100 (0, 0) 1

-}

createCircle : Color -> Float -> (Int, Int) -> Int -> DraggableForm
createCircle color radius initialPosition id =
  { form = filled color (circle radius)
  , id = id
  , isPointInside = insideCircle radius
  , position = initialPosition
  }


insideCircle : Float -> (Int, Int) -> (Int, Int) -> Bool
insideCircle radius center point =
  distance center point < radius


distance : (Int, Int) -> (Int, Int) -> Float
distance (x, y) (x', y') =
  (x - x')^2 + (y - y')^2
    |> toFloat
    |> sqrt


{-| Can be used to create a square DraggableForm. Takes the Color of the
square, the side length, the starting position, and the id.

    createSquare Color.blue 100 (0, 0) 1

-}

createSquare : Color -> Float -> (Int, Int) -> Int -> DraggableForm
createSquare color sideLength initialPosition id =
  { form = filled color (square sideLength)
  , id = id
  , isPointInside = insideSquare sideLength
  , position = initialPosition
  }


insideSquare : Float -> (Int, Int) -> (Int, Int) -> Bool
insideSquare sideLength center point =
  let (x, y) = center
      (x', y') = point
  in
      (abs (x - x') |> toFloat) < sideLength / 2 &&
      (abs (y - y') |> toFloat) < sideLength / 2


-- Update

{-| Actions describing the ways the model can be updated. Generally,
MoveSelected will follow the mouse position, ChangeSelected will be sent the
mouse location when the mouse is clicked, and UnselectAll will be sent when
the mouse is released

-}

type Action
  = MoveSelected (Int, Int)
  | ChangeSelection (Int, Int)
  | UnselectAll


{-| The update function takes one of the Actions and a Model and returns the
new model.

    update UnselectAll model

-}

update : Action -> Model -> Model
update action model =
  case action of
    MoveSelected position ->
      case model.selectedId of
        Just selectedId ->
         { model |
             forms <- updateIf (\f -> f.id == selectedId) (moveForm position) model.forms
         }
        Nothing ->
          model
    ChangeSelection position ->
      let selectedForm = first (\f -> f.isPointInside f.position position) model.forms
      in
        case selectedForm of
          Just form ->
            { model |
                forms <- groupSort (\f -> f.id == form.id) model.forms,
                selectedId <- Just form.id
            }
          Nothing ->
            model
    UnselectAll ->
      { model | selectedId <- Nothing }


first : (a -> Bool) -> List a -> Maybe a
first predicate list =
  List.filter predicate list |> List.head


updateIf : (a -> Bool) -> (a -> a) -> List a -> List a
updateIf predicate update list =
  List.map (\i -> if (predicate i) then (update i) else i) list


moveForm : (Int, Int) -> DraggableForm -> DraggableForm
moveForm position form =
  { form | position <- position }


groupSort : (a -> Bool) -> List a -> List a
groupSort predicate list =
  List.partition predicate list
    |> (\(a, b) -> List.append a b)


-- View

{-| The render function takes a Model and returns the List Form to be rendered
in the collage by the client. The forms will have been moved to their correct
positions and ordered with the most recently moved forms on "top".

    collage width height <| render model

-}

render : Model -> List Form
render model =
  List.map renderForm model.forms
    |> List.reverse


renderForm : DraggableForm -> Form
renderForm draggableForm =
  let
    (x, y) = draggableForm.position
    (x', y') = (toFloat x, toFloat y)
  in
    move (x', y') draggableForm.form
