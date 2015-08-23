module LevelEditor where

import Color
import Graphics.Collage as GC

import RenderNetwork as Render

cellStyle : GC.LineStyle
cellStyle = let def = GC.defaultLine in
  { def | width <- 1, cap <- GC.Flat, color <- Color.lightBlue }

grid : Float -> Float -> Float -> GC.Form
grid cellSize width height =
  let cell = GC.outlined cellStyle <| GC.square cellSize 
      shiftCells = List.indexedMap (\ i -> GC.moveX <| toFloat i * cellSize)
      row = GC.group << shiftCells <| List.repeat (round <| width / cellSize) cell
      shiftRows = List.indexedMap (\ i -> GC.moveY <| toFloat i * cellSize)
  in
    GC.group << shiftRows <| List.repeat (round <| height / cellSize) row

main = GC.collage 872 872 <| [grid 30 872 872]
