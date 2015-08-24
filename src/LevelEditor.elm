module LevelEditor where

import Color
import Dict
import Debug
import Graphics.Element exposing (flow, down, show)
import Graphics.Collage as GC exposing (Form)
import Keyboard
import Mouse
import Set exposing (Set)
import Signal

import Graph exposing (Graph)

import Types exposing (Network)
import Helpers

cellStyle : GC.LineStyle
cellStyle = let def = GC.defaultLine in
  { def | width <- 1, cap <- GC.Flat, color <- Color.lightBlue }

clickedStyle : GC.LineStyle
clickedStyle = let def = GC.defaultLine in
  { def | width <- 2, cap <- GC.Flat, color <- Color.blue }

edgeStyle : GC.LineStyle
edgeStyle = let def = GC.defaultLine in
  { def | width <- 2, cap <- GC.Round, color <- Color.lightBlue }

grid : Int -> Float -> Float -> Form
grid size width height =
  let cellSize = toFloat size
      (w', h') = (width/cellSize, height/cellSize)
      xs = List.map (\ x -> x * cellSize) [-w'/2..w'/2]
      ys = List.map (\ y -> y * cellSize) [-h'/2..h'/2]
      points = List.concatMap (\ x -> List.map (\ y -> (x, y)) ys) xs
      circ pt = GC.circle 2 |> GC.filled Color.lightBlue |> GC.move pt
      origin = GC.circle 4 |> GC.filled Color.red |> GC.move (0, 0)

      xAxis = List.map (\ x -> GC.circle 4 |> GC.filled Color.lightBlue |> GC.moveX x) xs
      yAxis = List.map (\ y -> GC.circle 4 |> GC.filled Color.lightBlue |> GC.moveY y) ys
  in
    GC.group <| List.map circ points ++ xAxis ++ yAxis ++ [origin]

snapTo : Int -> (Int, Int) -> (Int, Int)
snapTo cellSize (x, y) =
  let round' n = cellSize * (round <| toFloat n / toFloat cellSize) in
  (round' x, round' y)

shadow : (Int, Int) -> Form
shadow (x, y) = GC.circle 20 |> GC.traced cellStyle |> GC.move (toFloat x, toFloat y)

placeholder : (Int, Int) -> Form
placeholder (x, y) = GC.circle 20 |> GC.traced clickedStyle |> GC.move (toFloat x, toFloat y)

selectedCircle : (Int, Int) -> Form
selectedCircle (x, y) = GC.circle 20 |> GC.filled Color.blue |> GC.move (toFloat x, toFloat y)

maybeToList : Maybe a -> List a
maybeToList x = case x of
  Nothing -> []
  Just x  -> [x]

toggle : comparable -> Set comparable -> Set comparable
toggle x s = if Set.member x s then Set.remove x s else Set.insert x s

type alias EditorState = {
    nodes    : Set (Int, Int),
    selected : Maybe (Int, Int),
    edges    : Set ((Int, Int), (Int, Int))
  }

addNode : (Int, Int) -> EditorState -> EditorState
addNode node state =
  let (x, y) = unconvert node in
  if toFloat x < width && toFloat y < height
  then { state | nodes <- Set.insert node state.nodes }
  else state

deleteNode : (Int, Int) -> EditorState -> EditorState
deleteNode node state = { state | nodes <- Set.remove node state.nodes }

guard : Bool -> x -> Maybe x
guard condition x = if condition then Just x else Nothing

toggleSelect : Bool -> (Int, Int) -> EditorState -> EditorState
toggleSelect addingEdge node state =
  if Set.member node state.nodes
  then (case state.selected of
         Just p ->
           let s' = addEdge (p, node) state
           in
             if addingEdge && node /= p
             then { s' | selected <- Nothing }
             else { state | selected <- guard (p /= node) node }
         Nothing -> { state | selected <- Just node })
  else { state | selected <- Nothing }

deleteSelected : Bool -> EditorState -> EditorState
deleteSelected control state =
  case state.selected of
    Just node -> if control
                 then { state | nodes <- Set.remove node state.nodes, selected <- Nothing }
                 else state
    Nothing -> state

emptyState : EditorState
emptyState = { nodes = Set.empty, selected = Nothing, edges = Set.empty }

addEdge : ((Int, Int), (Int, Int)) -> EditorState -> EditorState
addEdge edge state = { state | edges <- Set.insert edge state.edges }

arrow (x1, y1) (x2', y2') =
  let x2 = if x2' > x1 then x2' - 20 else x2' + 20
      y2 = if y2' > y1 then y2' - 20 else y2' + 20
      (p1, p2) = ((x1, y1), (x2, y2))
      stem = GC.segment p1 p2
      (r, angle) = toPolar (x2 - x1, y2 - y1)
      cap = GC.ngon 3 10 |> GC.filled Color.lightBlue |> GC.rotate angle |> GC.move p2
  in
    GC.group [GC.traced edgeStyle stem, cap]

edgeSegment (p1, p2) =
  let wrap (x, y) = (toFloat x, toFloat y) in
  arrow (wrap p1) (wrap p2)

render : EditorState -> List Form
render state =
  let placeholders = List.map placeholder <| Set.toList state.nodes
      selectedCircles = maybeToList <| Maybe.map selectedCircle state.selected
      edges = List.map edgeSegment <| Set.toList state.edges
  in
    placeholders ++ selectedCircles ++ edges

dist : (Float, Float) -> (Float, Float) -> Float
dist (x1, y1) (x2, y2) = sqrt <| (x1 - x2)^2 + (y1 - y2)^2


toNetwork : EditorState -> Network
toNetwork state =
  let wrapPoint (x, y) = (toFloat x, toFloat y)
      nodes = Set.toList state.nodes |> List.map wrapPoint
      nodeMap = Dict.fromList (List.map2 (\ i s -> (s, i)) [1..List.length nodes] nodes)

      makePoint (x, y) = { coords = { x = x, y = y }, kind = Types.Intersection }
      points = Dict.toList nodeMap |> List.map (\ (s, i) -> { id = i, label = makePoint s })

      makeEdge (p1, p2) =
        let from = Dict.get p1 nodeMap |> Helpers.getOrFail "Edge from deleted node!"
            to = Dict.get p2 nodeMap |> Helpers.getOrFail "Edge from deleted node!"
            length = dist p1 p2
        in
          { to = to, from = from, label = { length = length, agents = [] } }
      wrapPoints ((x1, y1), (x2, y2)) = ((toFloat x1, toFloat y1), (toFloat x2, toFloat y2))
      edges = Set.toList state.edges |> List.map (makeEdge << wrapPoints)
  in
    Graph.fromNodesAndEdges points edges |> Debug.watch "net"

width = 1500
height = 900
cellSize = 50

convert (x, y) = (x - width // 2, -(y - height // 2))
unconvert (x, y) = (x + width // 2, -y + height // 2)

toSummary network = (Graph.nodes network, Graph.edges network)

main =
  let onGrid forms = (grid cellSize width height)::forms
      convert (x, y) = (x - width // 2, -(y - height // 2))
      points = Signal.map (snapTo 50 << convert) Mouse.position
      clicked = Signal.sampleOn Mouse.clicks points
      deletes = Signal.map deleteSelected <| Signal.mergeMany [Keyboard.isDown 46, Keyboard.isDown 88]

      addingEdge = Signal.sampleOn clicked Keyboard.shift
      handleSelect addingEdge point state =
        addNode point <| toggleSelect addingEdge point state
      clicks = Signal.map2 handleSelect addingEdge clicked
      changes = Signal.mergeMany [clicks, deletes]
      states = Signal.foldp (\ f s -> f s) emptyState changes

      shadows = Signal.map shadow points

      net = Signal.map (show << toSummary << toNetwork) states
      editor = Signal.map (GC.collage width height << onGrid << render) states
  in
    Signal.map2 (\ a b -> flow down [b, a]) net editor
