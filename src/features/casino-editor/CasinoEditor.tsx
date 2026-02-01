import "./CasinoEditor.css";
import { useEffect, useState } from "react";
import type { CasinoObjectInstance } from "../../core/ObjectDefinitions";
import { Toolbox } from "./components/Toolbox";
import { CasinoStage } from "./pixi/CasinoStage";

export const CasinoEditor = () => {
  // const occupiedCells = useMemo(() => {
  //   return getOccupiedCells(object);
  // }, [object]);

  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [instances, setInstances] = useState<CasinoObjectInstance[]>([]);
  const [hoverCell, setHoverCell] = useState<{ x: number; y: number } | null>(
    null
  );
  const [rotation, setRotation] = useState(0);

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

  return (
    <div className="main-container">
      <Toolbox selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
      <p>Hover: {hoverCell ? `${hoverCell.x}, ${hoverCell.y}` : "null"}</p>

      <CasinoStage
        selectedTool={selectedTool}
        instances={instances}
        onAddInstance={(inst) => setInstances((prev) => [...prev, inst])}
        setHoverCell={setHoverCell}
        hoverCell={hoverCell}
        rotation={rotation}
      />
    </div>
  );
};
