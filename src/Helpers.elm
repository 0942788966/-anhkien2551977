module Helpers where

import Debug

import Types exposing (Point)

getOrFail : String -> Maybe a -> a
getOrFail ex maybe =
  case maybe of
    Just something -> something
    Nothing -> Debug.crash ex

watchIf : String -> Bool -> a -> a
watchIf str bool value =
  if bool then Debug.watch str value else value

dist : Float -> Float -> Float
dist x y = sqrt (x^2 + y^2)

interpolate : Point -> Point -> Float -> Point
interpolate p1 p2 fraction = { x = (1 - fraction) * p1.x + fraction * p2.x
                             , y = (1 - fraction) * p1.y + fraction * p2.y
                             }