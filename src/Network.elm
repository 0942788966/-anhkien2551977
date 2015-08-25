module Network where

import Color exposing (Color)
import Dict
import Graphics.Element exposing (Element)
import Signal exposing (foldp)
import Time
import Debug

import IntDict exposing (IntDict)
import Graph exposing (Graph, Node, Edge, NodeContext, NodeId)

import Types exposing (..)
import Helpers exposing (..)
import RenderNetwork exposing (render)
import Agent

pickUpSpeed : Float
pickUpSpeed = 1.0

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
            spawnedAgents = case ctx.node.label.kind of
                              CarSpawner props -> if props.nextIn < 1 && props.startEdge == edgeIds
                                                  then [{kind = Car props.route, speed = props.speed, travelled = 0.0, totalDist = 0.0, color = Color.gray, lastEdge = Nothing}]
                                                  else []
                              _                -> []
        in 
          { road | agents <- List.filterMap check moved ++ spawnedAgents }

      newIncoming = IntDict.map (\ nid road -> updateEdge (nid, ctx.node.id) road) ctx.incoming
      newOutgoing = IntDict.map (\ nid road -> updateEdge (ctx.node.id, nid) road) ctx.outgoing

      newIncomingEdges = IntDict.toList newIncoming |> List.map (\(from,label) -> {from = from, to = ctx.node.id, label = label} )
      newOutgoingEdges = IntDict.toList newOutgoing |> List.map (\(to,label) -> {from = ctx.node.id, to = to, label = label} )
  in
    (newIncomingEdges, newOutgoingEdges)

updatePoint : List (Edge Road) -> NodeId -> Point -> Point
updatePoint edges id point =
  case point.kind of
    BusStop props    -> let newProps = if List.any (\e -> e.to == id && List.any (\a -> a.travelled == e.label.length) e.label.agents) edges
                                       then { props | currentlyWaiting <- props.currentlyWaiting - pickUpSpeed }
                                       else { props | currentlyWaiting <- props.currentlyWaiting + props.waitingDelta }
                        in
                          { point | kind <- BusStop newProps}
    StopSign props   -> let newProps = if List.any (\e -> e.to == id && List.any (\a -> a.travelled == e.label.length) e.label.agents) edges
                                       then { props | currentDelay <- props.currentDelay - 1 }
                                       else { props | currentDelay <- props.delay }
                        in
                          { point | kind <- StopSign newProps}
    CarSpawner props -> let newProps = if props.nextIn < 1
                                       then { props | nextIn <- props.interval }
                                       else { props | nextIn <- props.nextIn - 1 }
                        in
                          { point | kind <- CarSpawner newProps}
    Intersection    -> point

updateNetwork : Network -> Network
updateNetwork net =
  let go ctx (ins, outs) = let (in', out') = updateContext ctx in (ins ++ in', outs ++ out')
      (ins, outs) = Graph.fold go ([], []) net

      mergedEdges = let intsToInt x y = 2^x * 3^y
                        insDict = IntDict.fromList <| List.map (\e -> (intsToInt e.from e.to, e)) ins
                        outDict = IntDict.fromList <| List.map (\e -> (intsToInt e.from e.to, e)) outs
                        united = IntDict.uniteWith (\key inE outE -> let inElabel = inE.label in {inE | label <- {inElabel | agents <- inE.label.agents ++ outE.label.agents}} ) insDict outDict
                    in
                      IntDict.values united

      newNodes = Graph.nodes net |> List.map (\n -> {n | label <- updatePoint mergedEdges n.id n.label} {- |> watchIf "point" (n.id == 2) -} )
  in
    Graph.fromNodesAndEdges newNodes mergedEdges

analyze : Network -> Metrics -> Metrics
analyze net oldMetrics =
  let numAgents = Graph.edges net |> List.map (\edge -> List.length edge.label.agents |> toFloat) |> List.sum
      numBuses = Graph.edges net |> List.map (\edge -> List.filter isBus edge.label.agents |> List.length  |> toFloat) |> List.sum
      numRoads = Graph.edges net |> List.length |> toFloat
      totalBusDistanceTravelled = Graph.edges net |> List.map (\edge -> List.map busDistanceTravelled edge.label.agents |> List.sum) |> List.sum
      currentlyWaiting = Graph.nodes net |> List.map (\node -> waitingPassengersAt node.label |> toFloat) |> List.sum

      currentCongestion = numAgents / numRoads
      avgBusDistanceTravelled = totalBusDistanceTravelled / numBuses

      metrics = oldMetrics |> Dict.insert "ticks" (1 + (Dict.get "ticks" oldMetrics |> Maybe.withDefault 0))
                           |> Dict.insert "currentCongestion" currentCongestion
                           |> Dict.insert "totalCongestion" (currentCongestion + (Dict.get "totalCongestion" oldMetrics |> Maybe.withDefault 0))
                           |> Dict.insert "currentlyWaiting" currentlyWaiting
                           |> Dict.insert "totalWaiting" (currentlyWaiting + (Dict.get "totalWaiting" oldMetrics |> Maybe.withDefault 0))
                           |> Dict.insert "avgBusDistanceTravelled" avgBusDistanceTravelled
  in
    metrics |> Dict.insert "avgCongestion" ((Dict.get "totalCongestion" metrics |> getOrFail "") / (Dict.get "ticks" metrics |> getOrFail ""))
            |> Dict.insert "avgWaiting" ((Dict.get "totalWaiting" metrics |> getOrFail "") / (Dict.get "ticks" metrics |> getOrFail ""))
            |> Dict.insert "avgBusSpeed" ((Dict.get "avgBusDistanceTravelled" metrics |> getOrFail "") / (Dict.get "ticks" metrics |> getOrFail ""))
            |> Debug.watch "metrics"

update : State -> State
update (State network metrics) = State (updateNetwork network) (analyze network metrics)
