import Html exposing (text, Html)
import StartApp.Simple exposing (start)
import Signal exposing (Address)

type alias Model = { numCars:  Int }

type Action = Click | Tick

update : Action -> Model -> Model
update action oldModel = oldModel

view : Address Action -> Model -> Html
view address model = text "Transit Bureaucrat"

main = start
        { model = { numCars = 0 }, update = update, view = view }
