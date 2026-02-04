import { Graphics } from "@pixi/react";
import { CELL_SIZE } from "../../../utils/Constants";
import {
  TILE_FLOOR,
  TILE_OCCUPIED,
  type FloorMap,
} from "../../../core/FloorDefinitions";

export type GridSize = { rows: number; cols: number };

export interface GridLayerProps {
  gridSize: GridSize;
  floor: FloorMap;
}

export const GridLayer = ({ gridSize, floor }: GridLayerProps) => (
  <>
    {Array.from({ length: gridSize.rows }).map((_, y) =>
      Array.from({ length: gridSize.cols }).map((_, x) => (
        <Graphics
          key={`grid-${x}-${y}`}
          draw={(g) => {
            g.clear();

            const tile = floor[y]?.[x];

            if (tile === TILE_FLOOR) {
              g.beginFill(0xffffff, 0.08); // svetlije, suptilno
              g.drawRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
              g.endFill();
            } else if (tile === TILE_OCCUPIED) {
              // opciono: malo tamnije za occupied da se vidi razlika
              g.beginFill(0xffffff, 0.04);
              g.drawRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
              g.endFill();
            }

            g.lineStyle(1, 0x444444);
            g.drawRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          }}
        />
      )),
    )}
  </>
);
