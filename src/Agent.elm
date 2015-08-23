module Agent where

import Graph exposing (NodeId, NodeContext)
import IntDict exposing (IntDict)

import Types exposing (..)
import Helpers exposing (..)

translate : Agent -> Float -> Agent
translate agent maxTravelled =
  let limit = maxTravelled in
  { agent | travelled <- min (agent.travelled + agent.speed) limit }

changeEdge : Agent -> NodeId -> NodeId
changeEdge agent nid = 
  case agent.kind of
    -- TODO: cars and buses should have different behaviors
    Bus route -> IntDict.get nid route |> getOrFail ("Bus can't find where to go after node " ++ (toString nid) ++ " in " ++ (toString <| IntDict.toList route))
    Car route -> IntDict.get nid route |> getOrFail ("Bus can't find where to go after node " ++ (toString nid) ++ " in " ++ (toString <| IntDict.toList route))

move : NodeContext Point Road -> NodeId -> Road -> Agent -> Float -> ((NodeId, NodeId), Agent)
move ctx from road agent maxTravelled =
  let moved = translate agent maxTravelled
  in
    if moved.travelled > road.length
    then let remainder = moved.travelled - road.length 
         in
           ((ctx.node.id, changeEdge agent ctx.node.id), { agent | travelled <- remainder
                                                                 , lastEdge <- Just (from, ctx.node.id) })
    else ((from, ctx.node.id), moved)