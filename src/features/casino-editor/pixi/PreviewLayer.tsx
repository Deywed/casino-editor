import { Sprite } from "@pixi/react";
import {
  OBJECT_CATALOG,
  type CasinoObjectInstance,
} from "../../../core/ObjectDefinitions";
import { CELL_SIZE } from "../../../utils/Constants";
import { collides } from "../../../utils/GridUtils";

type PreviewLayerProps = {
  selectedTool: string | null;
  hoverCell: { x: number; y: number } | null;
  instances: CasinoObjectInstance[];
};

export const PreviewLayer = ({
  selectedTool,
  hoverCell,
  instances,
}: PreviewLayerProps) => {
  if (!selectedTool || !hoverCell) return null;

  const def = OBJECT_CATALOG[selectedTool];
  const collision = collides(hoverCell.x, hoverCell.y, selectedTool, instances);
  return collision ? (
    <Sprite
      image={def.imgSrc}
      x={hoverCell.x * CELL_SIZE}
      y={hoverCell.y * CELL_SIZE}
      width={def.width * CELL_SIZE}
      height={def.height * CELL_SIZE}
      alpha={0.5}
      tint={0xff0000}
    />
  ) : (
    <Sprite
      image={def.imgSrc}
      x={hoverCell.x * CELL_SIZE}
      y={hoverCell.y * CELL_SIZE}
      width={def.width * CELL_SIZE}
      height={def.height * CELL_SIZE}
      alpha={0.5}
      tint={0x00ff00}
    />
  );
};
