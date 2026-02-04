import { Sprite } from "@pixi/react";
import {
  OBJECT_CATALOG,
  type CasinoObjectInstance,
} from "../../../core/ObjectDefinitions";
import { CELL_SIZE } from "../../../utils/Constants";
import { collides, rotateObject } from "../../../utils/GridUtils";

type PreviewLayerProps = {
  selectedTool: string | null;
  hoverCell: { x: number; y: number } | null;
  instances: CasinoObjectInstance[];
  rotation?: number;
  gridSize: { rows: number; cols: number };
};

export const PreviewLayer = ({
  selectedTool,
  hoverCell,
  instances,
  rotation = 0,
  gridSize,
}: PreviewLayerProps) => {
  if (!selectedTool || !hoverCell) return null;

  const def = OBJECT_CATALOG[selectedTool];
  if (!def) return null;

  // ako je hover van grida ne prikazuje se preview
  if (
    hoverCell.x < 0 ||
    hoverCell.y < 0 ||
    hoverCell.x >= gridSize.cols ||
    hoverCell.y >= gridSize.rows
  ) {
    return null;
  }
  const fp = rotateObject(def.footprint, rotation);

  // 1. Izračunaj TRENUTNE dimenzije na gridu nakon rotacije
  const currentCellsWide = fp[0].length;
  const currentCellsHigh = fp.length;

  const pixelWidth = currentCellsWide * CELL_SIZE;
  const pixelHeight = currentCellsHigh * CELL_SIZE;

  // 2. Pozicioniraj tako da centar (anchor 0.5) legne tačno u sredinu zauzetog prostora
  const posX = hoverCell.x * CELL_SIZE + pixelWidth / 2;
  const posY = hoverCell.y * CELL_SIZE + pixelHeight / 2;

  const collision = collides(
    hoverCell.x,
    hoverCell.y,
    selectedTool,
    instances,
    rotation
  );

  return (
    <Sprite
      image={def.imgSrc}
      anchor={0.5}
      x={posX}
      y={posY}
      width={pixelWidth} // Koristi dinamičku širinu
      height={pixelHeight} // Koristi dinamičku visinu
      alpha={0.5}
      tint={collision ? 0xff0000 : 0x00ff00}
      angle={rotation}
    />
  );
};
