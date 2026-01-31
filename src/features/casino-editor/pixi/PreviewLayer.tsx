import { Sprite } from "@pixi/react";
import { OBJECT_CATALOG } from "../../../core/ObjectDefinitions";
import { CELL_SIZE } from "../../../utils/Constants";

type PreviewLayerProps = {
  selectedTool: string | null;
  hoverCell: { x: number; y: number } | null;
};

export const PreviewLayer = ({
  selectedTool,
  hoverCell,
}: PreviewLayerProps) => {
  if (!selectedTool || !hoverCell) return null;

  const def = OBJECT_CATALOG[selectedTool];

  return (
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
