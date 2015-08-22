import Html exposing (Html)
import Html.Events exposing (onClick)
import Html.Attributes
import StartApp.Simple exposing (start)
import Signal exposing (Address)
import Graphics.Element as G
import Text as T
import Color
import Array
import EmailTexts exposing (emailTexts)

type ScreenState = TitleScreen | ChooseLevelScreen | LevelScreen Int | MessageScreen Int

type alias Model = { numCars: Int, screen: ScreenState }

initialModel : Model
initialModel =  { numCars = 0, screen = TitleScreen }

type Action = GoToScreen ScreenState
            | Tick

update : Action -> Model -> Model
update action oldModel =  case action of
    GoToScreen newScreen -> { oldModel | screen <- newScreen }
    _ -> oldModel

view : Address Action -> Model -> Html
view address model = case model.screen of
    TitleScreen -> 
        let
            titleBackgroundColor = Color.rgb 94 5 135
            titleImage = G.image 800 600 "../game_logo.png"
        in
            Html.div []
            [   Html.fromElement <| titleImage,
                Html.button [ onClick address (GoToScreen <| MessageScreen 0) ] [Html.text "New Game" ],
                Html.button [ onClick address (GoToScreen ChooseLevelScreen) ] [Html.text "Continue" ]
            ]
    ChooseLevelScreen -> renderChooseLevel model
    MessageScreen n -> renderMessageScreen n address
    LevelScreen n -> renderLevel n model

renderChooseLevel : Model -> Html
renderChooseLevel model = Html.div [] [ Html.text "Choose a level" ]

renderLevel : Int -> Model -> Html
renderLevel levelNum model = 
    Html.fromElement <| G.flow G.down [title, mainGamePane, clock]

renderMessageScreen : Int -> Address Action -> Html
renderMessageScreen n address = case Array.get n emailTexts of
    Just emailText -> emailTemplate emailText address
    Nothing -> Html.text "Error - no message for this message id"

emailTemplate: String -> Address Action -> Html
emailTemplate msg address =
    Html.div [Html.Attributes.style
                [("backgroundColor", "rgb(94,5,135"),
                 ("width", "800px"),
                 ("height", "600px"),
                 ("color", "white")
                ]
             ]
        [
            Html.text "Email",
            Html.br [] [], Html.br [] [],
            Html.text "From: tklabbernick@super.com",
            Html.br [] [],
            Html.text "To: juliana.lopez@transit.municip.tri-cities.gov",
            Html.br [] [],
            Html.hr [] [],
            Html.text msg,
            Html.br [] [],
            Html.br [] [],
            Html.button [onClick address (GoToScreen <| LevelScreen 0) ] [Html.text "Start" ]
        ]

title : G.Element
title = G.show "Transit Bureaucrat"

mainGamePane : G.Element
mainGamePane = G.show "main pane"

clock: G.Element
clock = G.show "clock"

main = start
        { model = initialModel, update = update, view = view }

