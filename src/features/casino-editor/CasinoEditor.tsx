import "./CasinoEditor.css";
import { Stage, Container, Graphics } from "@pixi/react";
import { useMemo } from "react";
import type { CasinoObjectInstance } from "../../core/ObjectDefinitions";
import { getOccupiedCells } from "../../utils/GridUtils";
import { CELL_SIZE, GRID_SIZE } from "../../utils/Constants";

export const CasinoEditor = () => {
  // Primer objekta
  const object: CasinoObjectInstance = {
    instanceId: "obj-1",
    typeId: "slot_1x1",
    originX: 4,
    originY: 3,
  };

  // Izračunaj zauzete ćelije (ENGINE LOGIKA)
  const occupiedCells = useMemo(() => {
    return getOccupiedCells(object);
  }, [object]);

  return (
    <div className="main-container">
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        options={{ backgroundColor: 0x1e1e1e }}
      >
        <Container
          pivot={[(GRID_SIZE * CELL_SIZE) / 2, (GRID_SIZE * CELL_SIZE) / 2]}
          position={[window.innerWidth / 2, window.innerHeight / 2]} // centar Stage-a
        >
          {/* GRID */}
          {Array.from({ length: GRID_SIZE }).map((_, y) =>
            Array.from({ length: GRID_SIZE }).map((_, x) => (
              <Graphics
                key={`grid-${x}-${y}`}
                draw={(g) => {
                  g.clear();
                  g.lineStyle(1, 0x444444);
                  g.drawRect(
                    x * CELL_SIZE,
                    y * CELL_SIZE,
                    CELL_SIZE,
                    CELL_SIZE
                  );
                }}
              />
            ))
          )}

          {/* OCCUPIED CELLS (getOccupiedCells VIZUALIZACIJA) */}
          {occupiedCells.map((cell) => (
            <Graphics
              key={`occ-${cell.x}-${cell.y}`}
              draw={(g) => {
                g.clear();
                g.beginFill(0x1ff00, 0.6);
                g.drawRect(
                  cell.x * CELL_SIZE,
                  cell.y * CELL_SIZE,
                  CELL_SIZE,
                  CELL_SIZE
                );
                g.endFill();
              }}
            />
          ))}
        </Container>
      </Stage>
    </div>
  );
};
