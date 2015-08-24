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
                "As per our conversation on the 5th, we here at Süpër are highly interested in moving into the Tri-cities region." ++
                "We understand that there has been some, shall we say, regulatory difficulty among the esteemed members of the Tri-cities Municipal Transport " ++
                "Committee. As a highly-respected member of the transit-management community, you've been a valuable supporter of our efforts to revolutionize " ++
                "the world of municipal transport solutions. We know that we can count on you to... be persuasive in the upcoming MTC public meeting."],

            br,
            Html.text "With gratitude,",
            br,
            Html.text "Thaddeus Klabbernick",
            br,
            Html.text "Chief Executive Officer, Süpër Inc."
        ]
    ]

