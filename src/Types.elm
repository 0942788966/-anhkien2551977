module Types where

import Color exposing (Color)

import IntDict exposing (IntDict)
import Graph exposing (Graph, Node, Edge, NodeContext, NodeId)

type alias Coords = { x : Float, y : Float }

type alias Network = Graph Point Road

type alias Point = {
    coords : Coords,
    kind   : PointKind
}

type PointKind = Intersection
               | BusStop { currentlyWaiting : Float, waitingDelta : Float }
               | CarSpawner { route : Route, interval : Float, nextIn : Float, startEdge : (NodeId, NodeId) }

type alias Road = {
    length : Float,
    agents : List Agent
  }

type alias Agent = {
    kind      : AgentKind,
    speed     : Float,
    travelled : Float,
    color     : Color,
    lastEdge  : Maybe (NodeId, NodeId)
  }

type AgentKind = Bus Route | Car Route

type alias Route = IntDict NodeId


sizeOf : Agent -> Float
sizeOf agent =
  case agent.kind of
    Bus _ -> 0.2
    Car _ -> 0.16

canMoveThrough : Agent -> Point -> Bool
canMoveThrough agent point =
  case (point.kind, agent.kind) of
    (BusStop props, Bus _) -> props.currentlyWaiting <= 1.0
    _                      -> True
