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
};

export const PreviewLayer = ({
  selectedTool,
  hoverCell,
  instances,
  rotation = 0,
}: PreviewLayerProps) => {
  if (!selectedTool || !hoverCell) return null;

  const def = OBJECT_CATALOG[selectedTool];
  const collision = collides(
    hoverCell.x,
    hoverCell.y,
    selectedTool,
    instances,
    rotation
  );
  const fp = rotateObject(def.footprint, rotation);

  const width = fp[0].length * CELL_SIZE;
  const height = fp.length * CELL_SIZE;

  return (
    <Sprite
      image={def.imgSrc}
      anchor={0.5} // ROTIRA OKO CENTRA
      x={hoverCell.x * CELL_SIZE + width / 2}
      y={hoverCell.y * CELL_SIZE + height / 2}
      width={width}
      height={height}
      alpha={0.5}
      tint={collision ? 0xff0000 : 0x00ff00}
      angle={rotation}
    />
  );
};
