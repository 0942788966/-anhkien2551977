module Types where

import Color exposing (Color)

import IntDict exposing (IntDict)
import Graph exposing (Graph, Node, Edge, NodeContext, NodeId)

type alias Point = { x : Float, y : Float }

type alias Network = Graph Point Road

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

renderedSizeOf : Agent -> Float
renderedSizeOf agent =
  case agent.kind of
    Bus _ -> 20
    Car _ -> 12