import Html exposing (Html)
import Html.Events exposing (onClick)
import Html.Attributes exposing (style)
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
    TitleScreen ->  renderTitleScreen address
    ChooseLevelScreen -> renderChooseLevel address model
    MessageScreen n -> renderMessageScreen n address
    LevelScreen n -> renderLevel n address model

gameButton : Address Action -> Action -> String -> Html
gameButton address action text =
    Html.button 
        [
            onClick address action,
            style [ ("background-color", "rgb(94, 5, 135)"),
                    ("color", "white"),
                    ("width", "100px"),
                    ("height", "100px")
                  ]
        ] 
        [Html.text text]

renderTitleScreen : Address Action -> Html
renderTitleScreen address = 
        let
            titleBackgroundColor = Color.rgb 94 5 135
            titleImage = G.image 800 600 "../game_logo.png"
        in
            Html.div 
                []
                [   Html.fromElement <| titleImage,
                    gameButton address (GoToScreen <| MessageScreen 0)  "New Game",
                    gameButton address (GoToScreen <| ChooseLevelScreen)  "Continue"
                ]

renderChooseLevel : Address Action -> Model -> Html
renderChooseLevel address model = Html.div []
        [ Html.text "Choose a level" ,
          Html.button [onClick address (GoToScreen TitleScreen)] [Html.text "Return to title"]
        ]

renderLevel : Int -> Address Action -> Model -> Html
renderLevel levelNum address model = 
    Html.div []
    [
        Html.fromElement <| G.flow G.down [title, mainGamePane, clock],
        Html.button [ onClick address (GoToScreen TitleScreen) ] [Html.text "Return to title"]
    ]

renderMessageScreen : Int -> Address Action -> Html
renderMessageScreen n address = case Array.get n emailTexts of
    Just emailText -> Html.div []
                        [emailTemplate emailText,
                         gameButton address (GoToScreen <| LevelScreen 0) "Begin workday..."
                        ]
    Nothing -> Html.text "Error - no message for this message id"

emailTemplate: Html -> Html
emailTemplate msg =
    let
        br = Html.br [] []
        hr = Html.hr [] []
        emailLine bold rest = Html.span [] [Html.b [] [Html.text bold], Html.text rest]
    in
    Html.div [style
                [("backgroundColor", "rgb(94,5,135"),
                 ("width", "800px"),
                 ("height", "600px"),
                 ("color", "white")
                ]
             ]
        [
            Html.div [style [("background-color", "black"), ("text-align", "center")]] 
                [Html.text "Email"],
            emailLine "From: " "tklabbernick@super.com",
            br,
            emailLine "To: " "juliana.lopez@transit.municip.tri-cities.gov",
            hr,
            msg
        ]

title : G.Element
title = G.show "Transit Bureaucrat"

mainGamePane : G.Element
mainGamePane = G.show "main pane"

clock: G.Element
clock = G.show "clock"

main = start
        { model = initialModel, update = update, view = view }

