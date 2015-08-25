module Agent where

import Dict exposing (Dict)

import Graph exposing (NodeId, NodeContext)

import Types exposing (..)
import Helpers exposing (..)

translate : Agent -> Float -> Agent
translate agent maxTravelled =
  let limit = maxTravelled 
      newPos = min (agent.travelled + agent.speed) limit
  in
    { agent | travelled <- newPos
            , totalDist <- agent.totalDist + (newPos - agent.travelled)}

changeEdge : Agent -> NodeId -> NodeId -> NodeId
changeEdge agent from nid = 
  case agent.kind of
    Bus route -> Dict.get (from, nid) route |> getOrFail ("Bus can't find where to go after node " ++ (toString nid) ++ " in " ++ (toString <| Dict.toList route)) 
    Car route -> Dict.get nid route |> Maybe.withDefault 10000   -- pass in an invalid NodeId to make the car disappear after finishing its route

move : NodeContext Point Road -> NodeId -> Road -> Agent -> Float -> ((NodeId, NodeId), Agent)
move ctx from road agent maxTravelled =
  let moved = translate agent maxTravelled
  in
    if moved.travelled > road.length
    then if canMoveThrough agent ctx.node.label
         then let remainder = moved.travelled - road.length 
              in
                ((ctx.node.id, changeEdge agent from ctx.node.id), { agent | travelled <- remainder
                                                                      , lastEdge <- Just (from, ctx.node.id) })
         else ((from, ctx.node.id), { agent | travelled <- road.length})
    else ((from, ctx.node.id), moved)