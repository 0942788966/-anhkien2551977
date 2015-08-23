module RenderNetwork where

import Color exposing (Color)
import Graphics.Element exposing (Element)
import Graphics.Collage as GC

import Graph exposing (Graph, Edge)

import Types exposing (..)
import Helpers exposing (..)

size : Float
size = 2.5

roadStyle : GC.LineStyle
roadStyle = let def = GC.defaultLine in
            { def | width <- size * 10, cap <- GC.Round }

medianStyle : GC.LineStyle
medianStyle = let def = GC.defaultLine in
            { def | width <- size / 2,
                    cap <- GC.Round,
                    color <- Color.yellow,
                    dashing <- [8 * round size, 4 * round size] }

agentPositions : Network -> List (Point, Agent, Float)
agentPositions network =
  let go edge =
      let road = edge.label
          fromPoint = Graph.get edge.from network |> getOrFail "can't find fromPoint" |> .node |> .label
          toPoint = Graph.get edge.to network |> getOrFail "can't find toPoint" |> .node |> .label
          angle = atan2 (toPoint.y - fromPoint.y) (toPoint.x - fromPoint.x)
          length = road.length
          agents = road.agents
      in List.map (\a -> (interpolate fromPoint toPoint (a.travelled / length), a, angle)) agents
  in (List.concatMap go <| Graph.edges network)

loc : Point -> (Float, Float)
loc n = (size * 50 * n.x, size * 50 * n.y)

getNodes : Network -> Edge Road -> Maybe (Point, Point)
getNodes net edge = case (Graph.get edge.from net, Graph.get edge.to net) of
                      (Just x, Just y) -> Just (x.node.label, y.node.label)
                      _                -> Nothing

render : Network -> Element
render net =
  let
    edgeNodePairs = Graph.edges net |> List.filterMap (getNodes net)
    edgeLines = List.map (\ (n1, n2) -> GC.segment (loc n1) (loc n2)) edgeNodePairs

    roads = List.map (GC.traced roadStyle) edgeLines
    lines = List.map (GC.traced medianStyle) edgeLines
    agents = List.map (\(pt, agent, angle) -> GC.rotate angle <| GC.move (loc pt) <| GC.filled agent.color (GC.rect (renderedSizeOf agent) 12)) (agentPositions net)
  in
    GC.collage 800 800 <| roads ++ lines ++ agents