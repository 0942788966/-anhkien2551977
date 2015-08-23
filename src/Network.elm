module Network where

import Color exposing (Color)
import Graphics.Element exposing (Element)
import Signal exposing (foldp)
import Time exposing (fps)
import Debug

import IntDict exposing (IntDict)
import Graph exposing (Graph, Node, Edge, NodeContext, NodeId)

import Types exposing (..)
import Helpers exposing (..)
import RenderNetwork exposing (render)
import Agent

example : Network
example =
  let bus = Bus <| routeFromList [1, 2, 7, 6, 5, 3]
      bus2 = Bus <| routeFromList [6, 5, 3, 4]
      car = Car <| routeFromList [6, 5, 3, 4]

      points = List.map (\c -> {coords = c, kind = Intersection}) <| List.map (uncurry Coords) [
       (0.0,0.0), (1.0,0.0), (0.0,1.0), (1.0,1.0), (0.0,2.0), (1.0,2.0), (2.25,2.0)
      ]
      nodes = List.map2 Node [1..7] points
      
      edge from to distance agents = Edge from to (Road distance agents)
      
      edges = [
       edge 1 2 1.0 [{kind = bus, travelled = 0.0, speed = 0.04, color = Color.green, lastEdge = Nothing}],
       edge 2 4 1.0 [],
       edge 2 7 (dist 1 2) [],
       edge 3 1 1.0 [],
       edge 3 4 1.0 [],
       edge 4 6 1.0 [{kind = car, travelled = 0.0, speed = 0.05, color = Color.blue, lastEdge = Nothing}, {kind = car, travelled = 0.15, speed = 0.05, color = Color.blue, lastEdge = Nothing}],
       edge 5 3 1.0 [{kind = bus2, travelled = 0.0, speed = 0.05, color = Color.red, lastEdge = Nothing}],
       edge 6 5 1.0 [{kind = bus, travelled = 0.0, speed = 0.08, color = Color.orange, lastEdge = Nothing}],
       edge 7 6 1.0 [{kind = bus, travelled = 0.0, speed = 0.05, color = Color.purple, lastEdge = Nothing}, {kind = bus, travelled = 0.15, speed = 0.05, color = Color.purple, lastEdge = Nothing}]
      ]
  in
  Graph.fromNodesAndEdges nodes edges

moveAgents : NodeContext Point Road -> List ((NodeId, NodeId), Agent)
moveAgents ctx =
  let moveRoad (from, road) =
    let go agent calculated =
      let onEdge = List.filter (\ ((f, _), _) -> f == from) calculated |> List.map snd
          max = case onEdge |> List.head of
                  Just agent -> agent.travelled - sizeOf agent
                  Nothing    -> 1/0
      in
      Agent.move ctx from road agent max :: calculated
    in
    List.foldl go [] <| List.reverse <| List.sortBy .travelled road.agents
  in
  IntDict.toList ctx.incoming |> List.concatMap moveRoad

updateContext : NodeContext Point Road -> (List (Edge Road), List (Edge Road))
updateContext ctx =
  let moved = moveAgents ctx

      updateEdge edgeIds road =
        let check (e, a) = if e == edgeIds 
                           then Just a 
                           else Nothing 
        in 
          { road | agents <- List.filterMap check moved }

      newIncoming = IntDict.map (\ nid road -> updateEdge (nid, ctx.node.id) road) ctx.incoming
      newOutgoing = IntDict.map (\ nid road -> updateEdge (ctx.node.id, nid) road) ctx.outgoing

      newIncomingEdges = IntDict.toList newIncoming |> List.map (\(from,label) -> {from = from, to = ctx.node.id, label = label} )
      newOutgoingEdges = IntDict.toList newOutgoing |> List.map (\(to,label) -> {from = ctx.node.id, to = to, label = label} )
  in
    (newIncomingEdges, newOutgoingEdges)

update : Network -> Network
update net =
  let go ctx (ins, outs) = let (in', out') = updateContext ctx in (ins ++ in', outs ++ out')
      (ins, outs) = Graph.fold go ([], []) net

      mergedEdges = let intsToInt x y = 2^x * 3^y
                        insDict = IntDict.fromList <| List.map (\e -> (intsToInt e.from e.to, e)) ins
                        outDict = IntDict.fromList <| List.map (\e -> (intsToInt e.from e.to, e)) outs
                        united = IntDict.uniteWith (\key inE outE -> let inElabel = inE.label in {inE | label <- {inElabel | agents <- inE.label.agents ++ outE.label.agents}} ) insDict outDict
                    in
                      IntDict.values united
  in
    Graph.fromNodesAndEdges (Graph.nodes net) mergedEdges

main : Signal Element
main =
  let initialState = example
      state = foldp (\tick s -> update s) initialState (fps 30)
  in
    Signal.map render state
