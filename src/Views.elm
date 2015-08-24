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
import RenderNetwork

import Types
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
    Just emailText ->
        Html.body [style
                    [
                        ("background-color", levelBackgroundCss),
                        ("position", "absolute"),
                        ("width", "100%"),
                        ("height", "100%")
                    ]
                  ]
             [
                 Html.div
                    [style [
                        ("position", "absolute"),
                        ("top", "20px"),
                        ("left", "20px")
                        ]
                    ]
                    [
                        emailTemplate emailText,
                        gameButton address (GoToScreen <| LevelScreen 0) "Begin workday..."
                    ]
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
                 boxShadowCss,
                 ("width", "800px"),
                 ("height", "600px"),
                 ("color", "white"),
                 ("padding", "5px")
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
        Html.div []
        [
            controlPane [
                gameButton address (GoToScreen TitleScreen) "Return to title",
                gameButton address ToggleAdvancingTime "Play / Pause",
                gameButton address ResetTime "Stop",
                gameButton address ResetState "Reset",
                busStopsWidget address model
                ],
            gameClock model
        ],

        Html.div [style [("position", "absolute"), ("right", "20px"), ("top", "10px")]]
            --[Html.fromElement <| trafficGrid model]
            [Html.fromElement <| trafficGrid model]
    ]

renderEndLevel : Int -> Html
renderEndLevel levelNum =
  Html.body []

busStopsWidget : Address Action -> Model -> Html
busStopsWidget address model =
    let
        stops = model.levelData.stops

        stopNames : List String
        stopNames = L.map (\(BusStop name) -> name) stops


        stopButton : Int -> String -> Html
        stopButton idx name =
            let
                bkgColor = case model.levelData.activeStopIdx of
                    Just i -> if i == idx then "#ff0000" else "#ffffff"
                    Nothing -> "#ffffff"
            in
            Html.button
                [style [("border", "1px solid grey"),
                        ("background-color", bkgColor)
                       ],
                 onClick address <| ChangeStopOrder (MakeActiveStopIndex idx)
                ]

                [Html.text name]

        stopButtons : List Html
        stopButtons = L.indexedMap stopButton stopNames

    in Html.div []
        [
            Html.p [] [Html.text "Change bus stop order"],
            Html.p [] [Html.text <| "Additional changes: " ++ (toString model.levelData.changesRemaining)],
            Html.div [style [("border", "1px solid black")]] stopButtons,
            Html.button [onClick address <| ChangeStopOrder StopUp] [Html.text "^"],
            Html.button [onClick address <| ChangeStopOrder StopDown] [Html.text "v"]
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
                        ("width", "300px"),
                        ("height", "200px"),
                        whiteBackgroundCss
                      ]

        timeDisplay : GameTime -> G.Element
        timeDisplay (GameTime n) =
            let
                days = n // (60*24)
                hours = (n // 60) % (24)
                minutes = n % 60
                timeFormat n = if
                             | n == 0 -> "00"
                             | n <= 9 -> "0" ++ (toString n)
                             | otherwise -> (toString n)
                timeString = (timeFormat hours) ++ ":" ++ (timeFormat minutes)
                dateString = "Day: " ++ (toString (days + 1))
            in
               G.flow G.down
               [
                G.centered <| T.monospace <| T.fromString dateString,
                G.centered <| T.monospace <| T.fromString timeString
               ]

        clockCollage =
            let
                timeInMin t = toFloat ((\(GameTime n) -> n) t)
                hand len time =
                   let
                       angle = degrees (90 - 6 * time)
                   in
                      segment (0,0) (fromPolar (len, angle))
                hourHand t = hand 50 (t/12) |> traced (solid Color.charcoal)
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
       Html.div [style styleAttrs]
       [Html.fromElement <| G.flow G.right [clockCollage, timeDisplay model.time]]

trafficGrid : Model -> G.Element
trafficGrid model =
   let network = (\(Types.State network _) -> network) model.levelData.state
   in RenderNetwork.renderNetwork 0.9 network

