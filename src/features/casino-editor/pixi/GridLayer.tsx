import { Container, Graphics, Sprite } from "@pixi/react";
import { CELL_SIZE } from "../../../utils/Constants";
import { TILE_VOID, type FloorMap } from "../../../core/FloorDefinitions";
import floorTileImg from "../../../assets/floor_tile.png";
export type GridSize = { rows: number; cols: number };

export interface GridLayerProps {
  gridSize: GridSize;
  floor: FloorMap;
}

export const GridLayer = ({ gridSize, floor }: GridLayerProps) => (
  <>
    {Array.from({ length: gridSize.rows }).map((_, y) =>
      Array.from({ length: gridSize.cols }).map((_, x) => {
        const tile = floor[y]?.[x];

        // Ako je polje void crtamo samo liniju nema tepih
        if (tile === TILE_VOID) {
          return (
            <Graphics
              key={`grid-${x}-${y}`}
              draw={(g) => {
                g.clear();
                g.lineStyle(3, 0x111111);
                g.drawRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
              }}
            />
          );
        }

        //Ako je polje floor ili occupied crtamo tepih i liniju
        return (
          <Container key={`grid-${x}-${y}`}>
            <Sprite
              image={floorTileImg}
              x={x * CELL_SIZE}
              y={y * CELL_SIZE}
              width={CELL_SIZE}
              height={CELL_SIZE}
            />
            <Graphics
              draw={(g) => {
                g.clear();
                g.lineStyle(3, 0x111111);
                g.drawRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
              }}
            />
          </Container>
        );
      })
    )}
  </>
);
