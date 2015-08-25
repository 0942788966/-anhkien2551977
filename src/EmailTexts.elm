module EmailTexts where

import Html
import Array

br = Html.br [] []

emailTexts = Array.fromList
    [
        Html.div []
        [
            Html.text "Dear Mrs. Lopez",
            br,
            Html.p [] [Html.text <|
                "As per our conversation on the 5th, we here at Super are highly interested in moving into the Tri-cities region." ++
                "We understand that there has been some, shall we say, regulatory difficulty among the esteemed members of the Tri-cities Municipal Transport " ++
                "Committee. As a highly-respected member of the transit-management community, you've been a valuable supporter of our efforts to revolutionize " ++
                "the world of municipal transport solutions. We know that we can count on you to... be persuasive in the upcoming MTC public meeting."],

            br,
            Html.text "With gratitude,",
            br,
            Html.text "Thaddeus Klabbernick",
            br,
            Html.text "Chief Executive Officer, Super Inc."
        ],

        Html.div []
        [
            Html.text "Dear Mrs. Lopez",
            br,
            Html.p [] [Html.text "Excellent work so far. Demands for Uber have risen significantly in the Triangulon neighborhood after yesterday's bus route redesign. We knew we could count on you. Now, let's move on some more-trafficked downtown areas."],
            br,
            Html.text "Thaddeus Klabbernick",
            br,
            Html.text "Chief Executive Officer, Super Inc."
        ],

        Html.div []
        [
            Html.text "Dear Mrs. Lopez",
            br,
            Html.p [] [Html.text "Well, that wasn't so bad. Let's move on to the Eastern Sprawl area. Public transit is already a nightmare here - there's only one bus for the whole area. But let's see if we can make it more of a nightmare, eh?"],
            br,
            Html.text "Thaddeus Klabbernick",
            br,
            Html.text "Chief Executive Officer, Super Inc."

        ],

        Html.div []
        [
            Html.text "[The End]",
            br,
            Html.p [] [Html.text "We really wish we had the time and energy to turn this into a full game. Alas." ],
            br,
            Html.text "- Alex, Greg, and Tikhon"
        ]
    ]
