import { Sprite } from "@pixi/react";
import {
  OBJECT_CATALOG,
  type CasinoObjectInstance,
} from "../../../core/ObjectDefinitions";
import { CELL_SIZE } from "../../../utils/Constants";
import { collides, rotateObject } from "../../../utils/GridUtils";
import { TILE_FLOOR, type FloorMap } from "../../../core/FloorDefinitions";

type PreviewLayerProps = {
  selectedTool: string | null;
  hoverCell: { x: number; y: number } | null;
  instances: CasinoObjectInstance[];
  rotation?: number;
  gridSize: { rows: number; cols: number };
  floor: FloorMap;
};

export const PreviewLayer = ({
  selectedTool,
  hoverCell,
  instances,
  rotation = 0,
  gridSize,
  floor,
}: PreviewLayerProps) => {
  if (!selectedTool || !hoverCell) return null;

  const def = OBJECT_CATALOG[selectedTool];
  if (!def) return null;

  // 1. Provera granica grida
  if (
    hoverCell.x < 0 ||
    hoverCell.y < 0 ||
    hoverCell.x >= gridSize.cols ||
    hoverCell.y >= gridSize.rows
  ) {
    return null;
  }

  // 2. Logička rotacija matrice za proračun zauzeća i centra
  const fp = rotateObject(def.footprint, rotation);
  const currentCellsWide = fp[0].length;
  const currentCellsHigh = fp.length;

  // 3. POZICIJA (PosX/Y): Računamo centar na osnovu TRENUTNOG footprinta (u pikselima)
  // Ovo osigurava da preview uvek bude centriran na poljima koja bi zauzeo
  const posX = hoverCell.x * CELL_SIZE + (currentCellsWide * CELL_SIZE) / 2;
  const posY = hoverCell.y * CELL_SIZE + (currentCellsHigh * CELL_SIZE) / 2;

  // 4. VIZUELNA VELIČINA: Koristimo originalne dimenzije iz kataloga.
  // Pixi-jev 'angle' će zarotirati sprajt bez da ga deformiše (stretch/squash).
  const visualWidth = def.width * CELL_SIZE;
  const visualHeight = def.height * CELL_SIZE;

  // 5. Provera kolizije za bojenje (tint)
  const collision = collides(
    hoverCell.x,
    hoverCell.y,
    selectedTool,
    instances,
    rotation,
  );

  let fitsFloor = true;
  for (let dy = 0; dy < fp.length; dy++) {
    for (let dx = 0; dx < fp[0].length; dx++) {
      if (fp[dy][dx] !== 1) continue;

      const tx = hoverCell.x + dx;
      const ty = hoverCell.y + dy;

      // ako footprint izlazi van grida ili nije FLOOR onda ne moze
      if (
        ty < 0 ||
        ty >= gridSize.rows ||
        tx < 0 ||
        tx >= gridSize.cols ||
        floor[ty]?.[tx] !== TILE_FLOOR
      ) {
        fitsFloor = false;
        break;
      }
    }
    if (!fitsFloor) break;
  }

  const canPlace = !collision && fitsFloor;

  return (
    <Sprite
      image={def.imgSrc}
      anchor={0.5}
      x={posX}
      y={posY}
      width={visualWidth} // Originalna širina (ne rasteže se)
      height={visualHeight} // Originalna visina (ne rasteže se)
      alpha={0.5}
      tint={canPlace ? 0x00ff00 : 0xff0000}
      angle={rotation}
    />
  );
};
