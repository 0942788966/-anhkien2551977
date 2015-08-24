module Helpers where

import Debug

import Graph exposing (NodeId, NodeContext)
import Graph.Tree as Tree exposing (Tree)
import IntDict

import Types exposing (..)

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



findPath : Network -> (NodeId, NodeId) -> List NodeId
findPath net (startId, goalId) =
  let dfsTree = Graph.dfsTree startId net
  in
    findPathInTree goalId dfsTree |> getOrFail "couldn't find path!"

findPathInTree : NodeId -> Tree (NodeContext Point Road) -> Maybe (List NodeId)
findPathInTree goalId tree =
  case Tree.root tree of
    Just (ctx, forest) -> 
      if ctx.node.id == goalId
      then Just [goalId]
      else let paths = List.filterMap (findPathInTree goalId) forest
           in
             List.head paths |> Maybe.map (\lst -> ctx.node.id :: lst)
    Nothing -> Nothing



busRouteFromList : List NodeId -> Network -> Route
busRouteFromList x net = case x of
  []    -> IntDict.empty
  n::ns -> let pairs = List.map2 (,) (n::ns) (ns ++ [n])
               subroutes = List.map (findPath net) pairs
               combinedList = List.concatMap (List.drop 1) subroutes

               first = List.head combinedList |> getOrFail ""
               rest = List.tail combinedList |> getOrFail ""
           in 
             IntDict.fromList <| List.map2 (,) combinedList (rest ++ [first])

carRouteFromList : List NodeId -> Route
carRouteFromList x = case x of
  []    -> IntDict.empty
  n::ns -> IntDict.fromList <| List.map2 (,) (dropRight (n::ns)) (ns)
