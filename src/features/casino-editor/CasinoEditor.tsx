import "./CasinoEditor.css";
import { useEffect, useState } from "react";
import type { CasinoObjectInstance } from "../../core/ObjectDefinitions";
import { Toolbox } from "./components/Toolbox";
import { CasinoStage } from "./pixi/CasinoStage";
import { DEFAULT_GRID_SIZE, TILE_FLOOR } from "../../core/FloorDefinitions";
import {
  filterInstancesToFitGrid,
  getOccupiedCellList,
} from "../../utils/GridUtils";
import {
  createFloor,
  resizeFloorPreserve,
  setTiles,
} from "../../utils/FloorUtils";

export const CasinoEditor = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [instances, setInstances] = useState<CasinoObjectInstance[]>([]);
  const [hoverCell, setHoverCell] = useState<{ x: number; y: number } | null>(
    null
  );
  const [rotation, setRotation] = useState(0);

  const [gridSize, setGridSize] = useState(DEFAULT_GRID_SIZE);

  const [floor, setFloor] = useState(() =>
    createFloor(DEFAULT_GRID_SIZE.rows, DEFAULT_GRID_SIZE.cols)
  );

  //-----------gde da smestim ovo??
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "r") {
        setRotation((prev) => (prev + 90) % 360);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const expandGrid = () => {
    setGridSize((prev) => {
      const next = { rows: prev.rows + 1, cols: prev.cols + 1 };
      setFloor((old) => resizeFloorPreserve(old, next.rows, next.cols));
      return next;
    });
  };

  const shrinkGrid = () => {
    setGridSize((prev) => {
      const newRows = Math.max(1, prev.rows - 1);
      const newCols = Math.max(1, prev.cols - 1);

      // instance koje ispadaju iz grida
      setInstances((old) => {
        const kept = filterInstancesToFitGrid(old, newRows, newCols);
        const removed = old.filter((inst) => !kept.includes(inst));

        // kad se obrišu zbog resize ispod njih se vraca TILE_FLOOR
        if (removed.length) {
          const removedCells = removed.flatMap((inst) =>
            getOccupiedCellList(inst)
          );
          setFloor((f) => setTiles(f, removedCells, TILE_FLOOR));
        }

        return kept;
      });

      setFloor((old) => resizeFloorPreserve(old, newRows, newCols));

      setHoverCell((hc) => {
        if (!hc) return null;
        if (hc.x >= newCols || hc.y >= newRows) return null;
        return hc;
      });

      return { rows: newRows, cols: newCols };
    });
  };

  return (
    <div className="main-container">
      <Toolbox
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
        onExpandGrid={expandGrid}
        onShrinkGrid={shrinkGrid}
        canShrink={gridSize.rows > 1 && gridSize.cols > 1}
      />
      <p>Hover: {hoverCell ? `${hoverCell.x}, ${hoverCell.y}` : "null"}</p>

      <CasinoStage
        selectedTool={selectedTool}
        instances={instances}
        onAddInstance={(inst) => setInstances((prev) => [...prev, inst])}
        setHoverCell={setHoverCell}
        hoverCell={hoverCell}
        rotation={rotation}
        gridSize={gridSize}
        floor={floor}
        setFloor={setFloor}
        setInstances={setInstances}
      />
    </div>
  );
};
