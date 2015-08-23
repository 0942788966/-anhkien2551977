module Views where

import Html exposing (Html)
import Html.Events exposing (onClick)
import Html.Attributes exposing (style)
import Signal exposing (Address)
import Graphics.Element as G
import Text as T
import List as L
import Color
import Array

import EmailTexts exposing (emailTexts)
import Action exposing (..)
import GameScreens exposing (..)
import Model exposing (Model)

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

renderLevel : Int -> Address Action -> Model -> Html
renderLevel levelNum address model = 
    Html.div []
    [
        Html.fromElement <| G.flow G.down [title, mainGamePane, clock],
        gameButton address Tick "Delay traffic",
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

title : G.Element
title = G.show "Transit Bureaucrat"

mainGamePane : G.Element
mainGamePane = G.show "main pane"

clock: G.Element
clock = G.show "clock"
