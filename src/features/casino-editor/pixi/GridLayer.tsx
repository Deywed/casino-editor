import { Graphics } from "@pixi/react";
import { CELL_SIZE, GRID_SIZE } from "../../../utils/Constants";

export type GridSize = { rows: number; cols: number };

export interface GridLayerProps {
  gridSize: GridSize;
}

export const GridLayer = ({ gridSize }: GridLayerProps) => (
  <>
    {Array.from({ length: gridSize.rows }).map((_, y) =>
      Array.from({ length: gridSize.cols }).map((_, x) => (
        <Graphics
          key={`grid-${x}-${y}`}
          draw={(g) => {
            g.clear();
            g.lineStyle(1, 0x444444);
            g.drawRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          }}
        />
      )),
    )}
  </>
);
