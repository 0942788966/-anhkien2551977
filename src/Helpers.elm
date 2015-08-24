module Helpers where

import Dict exposing (Dict)
import Debug

import Graph exposing (Graph, NodeId, NodeContext)
import Graph.Tree as Tree exposing (Tree, Forest)

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



type BfsResults = Dict NodeId (List NodeId)

findPath : Network -> (NodeId, NodeId) -> List NodeId
findPath net (startId, goalId) =
  let paths = findAllPaths net startId
  in
    Dict.get goalId paths |> getOrFail "couldn't find path!"

findAllPaths : Network -> NodeId -> Dict NodeId (List NodeId)
findAllPaths net startId =
  let bfsVisitor ctxs depth acc = let nodeIds = List.map (\ctx -> ctx.node.id) ctxs
                                      currentNodeId = getOrFail "unknown nodeId" <| List.head nodeIds
                                  in 
                                    case Dict.get currentNodeId acc of
                                      Just path -> if List.length path > List.length nodeIds
                                                   then Dict.insert currentNodeId (List.reverse nodeIds) acc
                                                   else acc
                                      Nothing -> Dict.insert currentNodeId (List.reverse nodeIds) acc

      (results, graph) = Graph.guidedBfs Graph.alongOutgoingEdges bfsVisitor [startId] Dict.empty net
  in
    results


busRouteFromList : List NodeId -> Network -> BusRoute
busRouteFromList x net = case x of
  []    -> Dict.empty
  n::ns -> let pairs = List.map2 (,) (n::ns) (ns ++ [n])
               subroutes = List.map (findPath net) pairs
               combinedList = List.concatMap (List.drop 1) subroutes
           in 
             case combinedList of
               a::(b::rest) -> Dict.fromList <| List.map3 (\a b c -> ((a, b), c)) (a::(b::rest)) (b::rest ++ [a]) (rest ++ [a,b])
             

carRouteFromList : List NodeId -> CarRoute
carRouteFromList x = case x of
  []    -> Dict.empty
  n::ns -> Dict.fromList <| List.map2 (,) (dropRight (n::ns)) (ns)
