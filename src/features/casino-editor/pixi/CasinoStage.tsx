import { Stage, Container } from "@pixi/react";
import { Rectangle } from "pixi.js";
import { CELL_SIZE } from "../../../utils/Constants";
import {
  OBJECT_CATALOG,
  type CasinoObjectInstance,
} from "../../../core/ObjectDefinitions";
import {
  collides,
  findInstanceAtCell,
  getOccupiedCellList,
  rotateObject,
} from "../../../utils/GridUtils";
import { GridLayer } from "./GridLayer";
import { InstancesLayer } from "./InstancesLayer";
import { PreviewLayer } from "./PreviewLayer";
import {
  TILE_FLOOR,
  TILE_OCCUPIED,
  TILE_VOID,
  type FloorMap,
} from "../../../core/FloorDefinitions";
import { isFloor, setTiles, toggleTile } from "../../../utils/FloorUtils";
import { TOOL_FLOOR, TOOL_VOID } from "../components/Toolbox";

export interface CasinoStageProps {
  selectedTool: string | null;
  instances: CasinoObjectInstance[];
  onAddInstance: (instance: CasinoObjectInstance) => void;
  setHoverCell: (pos: { x: number; y: number } | null) => void;
  hoverCell: { x: number; y: number } | null;
  rotation: number;
  gridSize: { rows: number; cols: number };
  floor: FloorMap;
  setFloor: React.Dispatch<React.SetStateAction<FloorMap>>;
  setInstances: React.Dispatch<React.SetStateAction<CasinoObjectInstance[]>>;
}

export const CasinoStage = ({
  selectedTool,
  instances,
  onAddInstance,
  setHoverCell,
  hoverCell,
  rotation,
  gridSize,
  floor,
  setFloor,
  setInstances,
}: CasinoStageProps) => {
  const widthPx = gridSize.cols * CELL_SIZE;
  const heightPx = gridSize.rows * CELL_SIZE;

  const canPlaceOnFloor = (
    x: number,
    y: number,
    typeId: string,
    rot: number,
  ) => {
    const def = OBJECT_CATALOG[typeId];
    if (!def) return false;
    const fp = rotateObject(def.footprint, rot);

    for (let dy = 0; dy < fp.length; dy++) {
      for (let dx = 0; dx < fp[0].length; dx++) {
        if (fp[dy][dx] !== 1) continue;

        const tx = x + dx;
        const ty = y + dy;

        // mora da bude floor
        if (!isFloor(floor, tx, ty)) return false;
      }
    }
    return true;
  };

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

          if (selectedTool === TOOL_FLOOR) {
            setFloor((f) => toggleTile(f, x, y, TILE_FLOOR) ?? f);
            return;
          }

          if (selectedTool === TOOL_VOID) {
            const inst = findInstanceAtCell(instances, x, y);

            if (inst) {
              // klik je pogodio footprint nekog objekta -> brišemo ceo objekat
              const cells = getOccupiedCellList(inst);

              setInstances((prev) =>
                prev.filter((p) => p.instanceId !== inst.instanceId),
              );

              // kako si tražio: posle brisanja objekta ispod ide TILE_FLOOR
              setFloor((f) => setTiles(f, cells, TILE_FLOOR));
              return;
            }

            // nije pogodio objekat -> samo obriši pod (void)
            setFloor((f) => toggleTile(f, x, y, TILE_VOID) ?? f);
            return;
          }

          const collision = collides(x, y, selectedTool, instances, rotation);
          if (collision) return;

          if (!canPlaceOnFloor(x, y, selectedTool, rotation)) return;

          const newInst: CasinoObjectInstance = {
            instanceId: crypto.randomUUID(),
            typeId: selectedTool,
            originX: x,
            originY: y,
            rotation,
          };

          onAddInstance(newInst);

          const occupiedCells = getOccupiedCellList(newInst);
          setFloor((f) => setTiles(f, occupiedCells, TILE_OCCUPIED));
        }}
        onpointerleave={() => setHoverCell(null)}
      >
        <GridLayer gridSize={gridSize} floor={floor} />

        <PreviewLayer
          selectedTool={selectedTool}
          hoverCell={hoverCell}
          instances={instances}
          rotation={rotation}
          gridSize={gridSize}
          floor={floor}
        />

        <InstancesLayer instances={instances} />
      </Container>
    </Stage>
  );
};
