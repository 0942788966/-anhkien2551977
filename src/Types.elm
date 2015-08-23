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

type AgentKind = Bus BusRoute

type alias BusRoute = IntDict NodeId