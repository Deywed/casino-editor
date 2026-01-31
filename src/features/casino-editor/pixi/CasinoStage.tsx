import { Stage, Container } from "@pixi/react";
import { CELL_SIZE, GRID_SIZE } from "../../../utils/Constants";
import { GridLayer } from "./GridLayer";
import type { CasinoObjectInstance } from "../../../core/ObjectDefinitions";
import { InstancesLayer } from "./InstancesLayer";
import { Rectangle } from "pixi.js";
import { PreviewLayer } from "./PreviewLayer";

export interface CasinoStageProps {
  selectedTool: string | null;
  instances: CasinoObjectInstance[];
  onAddInstance: (instance: CasinoObjectInstance) => void;
  setHoverCell: (pos: { x: number; y: number } | null) => void;
  hoverCell: { x: number; y: number } | null;
}

export const CasinoStage = ({
  selectedTool,
  instances,
  onAddInstance,
  setHoverCell,
  hoverCell,
}: CasinoStageProps) => {
  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      options={{ backgroundColor: 0x1e1e1e }}
    >
      <Container
        pivot={[(GRID_SIZE * CELL_SIZE) / 2, (GRID_SIZE * CELL_SIZE) / 2]}
        position={[window.innerWidth / 2, window.innerHeight / 2]}
        eventMode="static"
        cursor="pointer"
        hitArea={
          new Rectangle(0, 0, GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE)
        }
        pointermove={(e) => {
          const pos = e.getLocalPosition(e.currentTarget);
          console.log(pos);

          const x = Math.floor(pos.x / CELL_SIZE);
          const y = Math.floor(pos.y / CELL_SIZE);

          setHoverCell({ x, y });
        }}
        pointerdown={(e) => {
          console.log("click2");

          if (!selectedTool) return;
          console.log("click");
          const pos = e.data.getLocalPosition(e.currentTarget);
          console.log(pos.x);
          console.log(pos.y);
          const x = Math.floor(pos.x / CELL_SIZE);
          const y = Math.floor(pos.y / CELL_SIZE);

          onAddInstance({
            instanceId: crypto.randomUUID(),
            typeId: selectedTool,
            originX: x,
            originY: y,
          });
        }}
        onpointerleave={() => setHoverCell(null)}
      >
        <GridLayer />
        <PreviewLayer selectedTool={selectedTool} hoverCell={hoverCell} />
        <InstancesLayer instances={instances} />
      </Container>
    </Stage>
  );
};
