module RenderNetwork where

import Color exposing (Color)
import Dict
import Graphics.Element as Element exposing (Element, show, flow, down)
import Graphics.Collage as GC exposing (Form)
import Text

import Graph exposing (Edge)

import Types exposing (..)
import Helpers exposing (..)

size : Float
size = 3

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
getNodes net edge = 
  case (Graph.get edge.from net, Graph.get edge.to net) of
    (Just x, Just y) -> Just (x.node.label.coords, y.node.label.coords)
    _                -> Nothing

renderAgent : (Coords, Agent, Float) -> Form
renderAgent (coords, agent, angle) =
    let
        renderedSize =
            case agent.kind of
                Bus _ -> 25
                Car _ -> 20
    in
        GC.rotate angle <| GC.move (loc coords) <| GC.filled agent.color <| GC.rect renderedSize 12

renderPoint : Point -> Form
renderPoint point =
  case point.kind of 
    BusStop props  -> let crowdSize = max 2 <| min 20 (sqrt props.currentlyWaiting * 2)
                          crowdCircle = GC.filled Color.lightBlue <| GC.circle crowdSize
                          busSign = GC.group [ GC.traced GC.defaultLine <| GC.segment (0,0) (-20,50)
                                             , GC.move (-20,50) <| GC.filled Color.yellow <| GC.circle 15
                                             , GC.rotate (degrees 22.5) <| GC.move (-20,50) <| GC.text <| Text.fromString "BUS"
                                             ]
                      in
                        GC.move (addCoords (-size*5,size*5) (loc point.coords)) <| GC.group [crowdCircle, busSign]
    StopSign props -> GC.group [ GC.traced GC.defaultLine <| GC.segment (0,0) (-20,50)
                               , GC.move (-20,50) <| GC.filled Color.red <| GC.ngon 8 15
                               ] |> GC.move (addCoords (-size*5,size*5) (loc point.coords))
    _              -> GC.toForm Element.empty

renderNetwork : Float -> Network -> Element
renderNetwork scale net =
  let
    points = Graph.nodes net |> List.map .label
    edgeNodePairs = Graph.edges net |> List.filterMap (getNodes net)
    edgeLines = List.map (\ (n1, n2) -> GC.segment (loc n1) (loc n2)) edgeNodePairs

    busStops = List.map renderPoint points
    roads = List.map (GC.traced roadStyle) edgeLines
    lines = List.map (GC.traced medianStyle) edgeLines
    agents = List.map renderAgent (agentPositions net)
        
    globalTransform = (-200.0, -100.0)
    mapGroup = GC.move globalTransform (GC.group <| roads ++ lines ++ busStops ++ agents)
  in
    GC.collage 1000 800 <| [GC.scale scale mapGroup]

render : Float -> State -> Element
render scale (State network metrics) =
  flow down [ show ("Avg bus speed = " ++ toString (Dict.get "avgBusSpeed" metrics |> Maybe.withDefault 0)) 
            , show ("Avg congestion = " ++ toString (Dict.get "avgCongestion" metrics |> Maybe.withDefault 0)) 
            , show ("Avg waiting passengers = " ++ toString (Dict.get "avgWaiting" metrics |> Maybe.withDefault 0)) 
            , renderNetwork scale network
            ]
