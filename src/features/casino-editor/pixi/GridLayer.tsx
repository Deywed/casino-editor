import { Graphics } from "@pixi/react";
import { CELL_SIZE, GRID_SIZE } from "../../../utils/Constants";

export const GridLayer = () => (
  <>
    {Array.from({ length: GRID_SIZE }).map((_, y) =>
      Array.from({ length: GRID_SIZE }).map((_, x) => (
        <Graphics
          key={`grid-${x}-${y}`}
          draw={(g) => {
            g.clear();
            g.lineStyle(1, 0x444444);
            g.drawRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          }}
        />
      ))
    )}
  </>
);
