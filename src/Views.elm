module Views where

import Html exposing (Html)
import Html.Events exposing (onClick)
import Html.Attributes exposing (style)
import Signal exposing (Address)
import Graphics.Element as G
import Graphics.Collage exposing (..)
import Text as T
import List as L
import Color
import Array
import Debug
import Network

import EmailTexts exposing (emailTexts)
import GameScreens exposing (..)
import Model exposing (..)

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
renderChooseLevel address model =
    let
        screenLinkIfUnlocked address (screenType, name) =
            case screenType of
                Message n -> Html.li [onClick address (GoToScreen <| MessageScreen n)] [Html.text name]
                Level n -> Html.li [onClick address (GoToScreen <| LevelScreen n)] [Html.text name]
   
    in Html.div []
        [
            Html.div [style [("color", "white"),
                             ("background-color", "rgb(94, 5, 135"),
                             ("width", "800px"),
                             ("height", "600px")]
                     ] 
            [
                Html.text "Choose a level" ,
                Html.ul [] <| L.map (screenLinkIfUnlocked address) gameScreens
            ],
           gameButton address (GoToScreen TitleScreen) "Return to title"
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

levelBackgroundCss = "rgb(140, 59, 177)"
boxShadowCss = ("box-shadow", "5px 5px 10px #222222")
whiteBackgroundCss = ("background-color", "white")

renderLevel : Int -> Address Action -> Model -> Html
renderLevel levelNum address model = 
    Html.body [style
                [("background-color", levelBackgroundCss),
                 ("position", "absolute"),
                 ("width", "100%"),
                 ("height", "100%")
                ]
             ]
    [
        controlPane [
            gameButton address ToggleAdvancingTime "Delay traffic",
            gameButton address (GoToScreen TitleScreen) "Return to title",
            gameButton address ToggleAdvancingTime "Toggle time"

        ],

        gameClock model,
        trafficGrid model
    ]

controlPane : List Html -> Html
controlPane contents =
   let styleAttrs = [("position", "absolute"),
                     boxShadowCss,
                     ("width", "400px"),
                     ("height", "500px"),
                     ("left", "10px"),
                     ("top", "10px"),
                     whiteBackgroundCss
                    ]
   in
      Html.div [style styleAttrs] contents

gameClock: Model -> Html
gameClock model =
    let styleAttrs = [
                        ("position", "absolute"),
                        boxShadowCss,
                        ("left", "100px"),
                        ("top", "520px"),
                        ("width", "200px"),
                        ("height", "200px"),
                        whiteBackgroundCss
                      ]

        clockCollage t =
            let 
                timeInMin t = toFloat ((\(GameTime n) -> n) t)
                hand len time =
                   let
                       angle = degrees (90 - 6 * time)
                   in 
                      segment (0,0) (fromPolar (len, angle))
                hourHand t = hand 50 (t/60) |> traced (solid Color.charcoal)
                minuteHand t = hand 90 t |> traced (solid Color.orange)
            in
                collage 200 200
                    [ 
                        filled Color.lightGrey (ngon 30 90),
                        outlined (solid Color.grey) (ngon 30 90),
                        hourHand <| timeInMin model.time,
                        minuteHand <| timeInMin model.time
                    ]
    in
       Html.div [style styleAttrs] [Html.fromElement <| clockCollage 0, Html.fromElement (G.show model.time)]

trafficGrid : Model -> Html
trafficGrid model = 
    let
        actualGame = Network.render model.network
    in
        Html.div [style [("float", "right")]] [Html.fromElement actualGame]

