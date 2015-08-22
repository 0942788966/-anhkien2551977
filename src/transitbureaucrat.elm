import Html exposing (Html)
import StartApp.Simple exposing (start)
import Signal exposing (Address)
import Graphics.Element as G
import Text as T

type alias Model = { numCars:  Int }

type Action = Click | Tick

update : Action -> Model -> Model
update action oldModel = oldModel

view : Address Action -> Model -> Html
view address model = Html.fromElement <|
    G.flow G.down [title, mainGamePane]


title : G.Element
title = G.show "Transit Bureaucrat"

mainGamePane : G.Element
mainGamePane = G.show "main pane"

main = start
        { model = { numCars = 0 }, update = update, view = view }
