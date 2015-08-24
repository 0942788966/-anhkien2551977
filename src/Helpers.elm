module Helpers where

import Debug

import Graph exposing (NodeId)
import IntDict
import List as L
import Array as A

import Types exposing (Coords, Route)

getOrFail : String -> Maybe a -> a
getOrFail ex maybe =
  case maybe of
    Just something -> something
    Nothing -> Debug.crash ex

dropRight : List a -> List a
dropRight lst = List.reverse <| List.drop 1 <| List.reverse lst

watchIf : String -> Bool -> a -> a
watchIf str bool value =
  if bool then Debug.watch str value else value

dist : Float -> Float -> Float
dist x y = sqrt (x^2 + y^2)

interpolate : Coords -> Coords -> Float -> Coords
interpolate p1 p2 fraction = { x = (1 - fraction) * p1.x + fraction * p2.x
                             , y = (1 - fraction) * p1.y + fraction * p2.y
                             }

addCoords : (Float, Float) -> (Float, Float) -> (Float, Float)
addCoords (x1,y1) (x2,y2) = (x1+x2, y1+y2)

busRouteFromList : List NodeId -> Route
busRouteFromList x = case x of
  []    -> IntDict.empty
  n::ns -> IntDict.fromList <| List.map2 (,) (n::ns) (ns ++ [n])

carRouteFromList : List NodeId -> Route
carRouteFromList x = case x of
  []    -> IntDict.empty
  n::ns -> IntDict.fromList <| List.map2 (,) (dropRight (n::ns)) (ns)



moveIthMemberDown : Int -> List a -> List a
moveIthMemberDown i ls =
    let
        ar = A.fromList ls
        elem = A.get i ar
        nextElem = A.get (i+1) ar
        beginning = L.take i ls
        end = L.drop (i+2) ls
    in case (elem, nextElem) of 
        (Just e1, Just e2) -> beginning ++ [e2] ++ [e1] ++ end
        _ -> ls

moveIthMemberUp : Int -> List a -> List a
moveIthMemberUp i ls = 
    let
        ar = A.fromList ls
        elem = A.get i ar
        prevElem = A.get (i-1) ar
        beginning = L.take (i-1) ls
        end = L.drop (i+1) ls
    in case (elem, prevElem) of 
        (Just e1, Just e0) -> beginning ++ [e1] ++ [e0] ++ end
        _ -> ls
