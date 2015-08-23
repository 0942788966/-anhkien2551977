module LevelEditor where

import Color
import Debug
import Graphics.Collage as GC exposing (Form)
import Keyboard
import Mouse
import Set exposing (Set)
import Signal

import RenderNetwork as Render

cellStyle : GC.LineStyle
cellStyle = let def = GC.defaultLine in
  { def | width <- 1, cap <- GC.Flat, color <- Color.lightBlue }

clickedStyle : GC.LineStyle
clickedStyle = let def = GC.defaultLine in
  { def | width <- 2, cap <- GC.Flat, color <- Color.blue }

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
    selected : Set (Int, Int)
  }

addNode : (Int, Int) -> EditorState -> EditorState
addNode node state = { state | nodes <- Set.insert node state.nodes }

deleteNode : (Int, Int) -> EditorState -> EditorState
deleteNode node state = { state | nodes <- Set.remove node state.nodes }

toggleSelect : (Int, Int) -> EditorState -> EditorState
toggleSelect node state = if Set.member node state.nodes
                          then { state | selected <- toggle node state.selected }
                          else state

deleteSelected : Bool -> EditorState -> EditorState
deleteSelected control state = 
  if control 
  then { state | nodes <- Set.diff state.nodes state.selected, selected <- Set.empty }
  else state

emptyState : EditorState
emptyState = { nodes = Set.empty, selected = Set.empty }

render : EditorState -> List Form
render state =
  let placeholders = (List.map placeholder <| Set.toList state.nodes)
      selectedCircles = (List.map selectedCircle <| Set.toList state.selected)
  in
    placeholders ++ selectedCircles

main =
  let onGrid forms = (grid 30 1500 900)::forms
      convert (x, y) = (x - 1500 // 2, -(y - 900 // 2))
      points = Signal.map (snapTo 30 << convert) Mouse.position
      clicked = Signal.sampleOn Mouse.clicks points
      deletes = Signal.map deleteSelected <| Keyboard.isDown 46

      clicks = Signal.map (\ p s -> addNode p <| toggleSelect p s) clicked
      changes = Signal.mergeMany [clicks, deletes]
      states = Signal.foldp (\ f s -> f s) emptyState changes

      shadows = Signal.map shadow points
  in
    Signal.map (GC.collage 1500 900 << onGrid << render) states
