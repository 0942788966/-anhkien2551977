module RenderNetwork where

import Color exposing (Color)
import Graphics.Element as Element exposing (Element)
import Graphics.Collage as GC exposing (Form)

import Graph exposing (Edge)

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

agentPositions : Network -> List (Coords, Agent, Float)
agentPositions network =
  let go edge =
      let road = edge.label
          fromCoords = Graph.get edge.from network |> getOrFail "can't find fromCoords" |> .node |> .label |> .coords
          toCoords = Graph.get edge.to network |> getOrFail "can't find toCoords" |> .node |> .label |> .coords
          angle = atan2 (toCoords.y - fromCoords.y) (toCoords.x - fromCoords.x)
          length = road.length
          agents = road.agents
      in List.map (\a -> (interpolate fromCoords toCoords (a.travelled / length), a, angle)) agents
  in (List.concatMap go <| Graph.edges network)

loc : Coords -> (Float, Float)
loc n = (size * 50 * n.x, size * 50 * n.y)

getNodes : Network -> Edge Road -> Maybe (Coords, Coords)
getNodes net edge = case (Graph.get edge.from net, Graph.get edge.to net) of
                      (Just x, Just y) -> Just (x.node.label.coords, y.node.label.coords)
                      _                -> Nothing

renderAgent : (Coords, Agent, Float) -> Form
renderAgent (coords, agent, angle) =
  GC.rotate angle <| GC.move (loc coords) <| GC.filled agent.color <| GC.rect (renderedSizeOf agent) 12

renderPoint : Point -> Form
renderPoint point =
  case point.kind of 
    BusStop props -> let size = max 2 <| min 10 (props.currentlyWaiting / 5)
                     in
                       GC.move (loc point.coords) <| GC.filled Color.lightBlue <| GC.circle size
    Intersection  -> GC.toForm Element.empty

render : Network -> Element
render net =
  let
    points = Graph.nodes net |> List.map .label
    edgeNodePairs = Graph.edges net |> List.filterMap (getNodes net)
    edgeLines = List.map (\ (n1, n2) -> GC.segment (loc n1) (loc n2)) edgeNodePairs

    busStops = List.map renderPoint points
    roads = List.map (GC.traced roadStyle) edgeLines
    lines = List.map (GC.traced medianStyle) edgeLines
    agents = List.map renderAgent (agentPositions net)
  in
    GC.collage 800 800 <| roads ++ lines ++ busStops ++ agents
