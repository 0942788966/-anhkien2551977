module LevelEditor where

import Color
import Debug
import Graphics.Collage as GC exposing (Form)
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
  in
    GC.group <| List.map circ points ++ [origin]

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

mergeFormSignals : List (Signal (List Form)) -> Signal (List Form)
mergeFormSignals ls = case ls of
  []          -> Signal.constant []
  (sig::sigs) -> List.foldl (Signal.map2 (++)) sig sigs

maybeToList : Maybe a -> List a
maybeToList x = case x of
  Nothing -> []
  Just x  -> [x]

toggle : comparable -> Set comparable -> Set comparable
toggle x s = if Set.member x s then Set.remove x s else Set.insert x s

main =
  let onGrid forms = (grid 30 1500 900)::forms
      convert (x, y) = (x - 1500 // 2, -(y - 900 // 2))
      points = Signal.map (snapTo 30 << convert) Mouse.position
      clicked = Signal.sampleOn Mouse.clicks points

      saved = Signal.foldp Set.insert Set.empty clicked
      isSaved p s = if Set.member p s then Just p else Nothing

      toggle' x s = Maybe.withDefault s <| Maybe.map (flip toggle s) x
      selected = Signal.foldp toggle' Set.empty <| Signal.map2 isSaved clicked saved
      selectedCircles = Signal.map (List.map selectedCircle << Set.toList) selected

      shadows = Signal.map shadow points
      placeholders = Signal.map (List.map placeholder << Set.toList) saved

      wrap = Signal.map (\ x -> [x])
      forms = mergeFormSignals [wrap shadows, placeholders, selectedCircles]
  in
    Signal.map (GC.collage 1500 900 << onGrid) forms
