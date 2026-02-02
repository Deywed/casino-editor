import { Stage, Container } from "@pixi/react";
import { Rectangle } from "pixi.js";
import { CELL_SIZE } from "../../../utils/Constants";
import type { CasinoObjectInstance } from "../../../core/ObjectDefinitions";
import { collides } from "../../../utils/GridUtils";
import { GridLayer } from "./GridLayer";
import { InstancesLayer } from "./InstancesLayer";
import { PreviewLayer } from "./PreviewLayer";

export interface CasinoStageProps {
  selectedTool: string | null;
  instances: CasinoObjectInstance[];
  onAddInstance: (instance: CasinoObjectInstance) => void;
  setHoverCell: (pos: { x: number; y: number } | null) => void;
  hoverCell: { x: number; y: number } | null;
  rotation: number;
  gridSize: { rows: number; cols: number };
}

export const CasinoStage = ({
  selectedTool,
  instances,
  onAddInstance,
  setHoverCell,
  hoverCell,
  rotation,
  gridSize,
}: CasinoStageProps) => {
  const widthPx = gridSize.cols * CELL_SIZE;
  const heightPx = gridSize.rows * CELL_SIZE;

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      options={{ backgroundColor: 0x1e1e1e }}
    >
      <Container
        pivot={[widthPx / 2, heightPx / 2]}
        position={[window.innerWidth / 2, window.innerHeight / 2]}
        eventMode="static"
        cursor="pointer"
        hitArea={new Rectangle(0, 0, widthPx, heightPx)}
        pointermove={(e) => {
          const pos = e.getLocalPosition(e.currentTarget);
          const x = Math.floor(pos.x / CELL_SIZE);
          const y = Math.floor(pos.y / CELL_SIZE);

          if (x < 0 || y < 0 || x >= gridSize.cols || y >= gridSize.rows) {
            setHoverCell(null);
            return;
          }

          setHoverCell({ x, y });
        }}
        pointerdown={(e) => {
          if (!selectedTool) return;

          const pos = e.data.getLocalPosition(e.currentTarget);
          const x = Math.floor(pos.x / CELL_SIZE);
          const y = Math.floor(pos.y / CELL_SIZE);

          if (x < 0 || y < 0 || x >= gridSize.cols || y >= gridSize.rows) {
            return;
          }

          const collision = collides(x, y, selectedTool, instances, rotation);
          if (collision) return;

          onAddInstance({
            instanceId: crypto.randomUUID(),
            typeId: selectedTool,
            originX: x,
            originY: y,
            rotation,
          });
        }}
        onpointerleave={() => setHoverCell(null)}
      >
        <GridLayer gridSize={gridSize} />

        <PreviewLayer
          selectedTool={selectedTool}
          hoverCell={hoverCell}
          instances={instances}
          rotation={rotation}
          gridSize={gridSize}
        />

        <InstancesLayer instances={instances} />
      </Container>
    </Stage>
  );
};
