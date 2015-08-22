import Html exposing (Html)
import Html.Events exposing (onClick)
import StartApp.Simple exposing (start)
import Signal exposing (Address)
import Graphics.Element as G
import Text as T
import Color

type ScreenState = TitleScreen | LevelScreen Int

type alias Model = { numCars: Int, screen: ScreenState }

initialModel : Model
initialModel =  { numCars = 0, screen = TitleScreen }

type Action = ClickNewGame 
            | ClickContinue
            | Tick

update : Action -> Model -> Model
update action oldModel =  case action of
    ClickNewGame -> { oldModel | screen <- LevelScreen 1 }
    _ -> oldModel

view : Address Action -> Model -> Html
view address model = case model.screen of
    TitleScreen -> 
        Html.div []
            [ Html.fromElement <| titleView,
              Html.button [ onClick address ClickNewGame] [Html.text "New Game" ],
              Html.button [ onClick address ClickContinue] [Html.text "Continue" ]
            ]
    _ -> Html.fromElement <| G.flow G.down [title, mainGamePane, clock]

titleBackgroundColor = Color.rgb 94 5 135

titleView : G.Element
titleView = G.image 800 600 "../game_logo.png"

title : G.Element
title = G.show "Transit Bureaucrat"

mainGamePane : G.Element
mainGamePane = G.show "main pane"

clock: G.Element
clock = G.show "clock"

main = start
        { model = initialModel, update = update, view = view }

