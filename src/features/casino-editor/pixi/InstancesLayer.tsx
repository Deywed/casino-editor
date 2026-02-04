import {
  OBJECT_CATALOG,
  type CasinoObjectInstance,
} from "../../../core/ObjectDefinitions";
import { CELL_SIZE } from "../../../utils/Constants";
import { rotateObject } from "../../../utils/GridUtils";
import { AnimatedObject } from "../components/AnimatedObject";

export interface InstancesLayerProps {
  instances: CasinoObjectInstance[];
}

export const InstancesLayer = ({ instances }: InstancesLayerProps) => {
  return (
    <>
      {instances.map((inst) => {
        const def = OBJECT_CATALOG[inst.typeId];
        if (!def) return null;

        // Logički otisak za pozicioniranje centra
        const fp = rotateObject(def.footprint, inst.rotation);
        const currentCellsWide = fp[0].length;
        const currentCellsHigh = fp.length;

        // POZICIJA se računa na osnovu TRENUTNOG footprinta
        const posX =
          inst.originX * CELL_SIZE + (currentCellsWide * CELL_SIZE) / 2;
        const posY =
          inst.originY * CELL_SIZE + (currentCellsHigh * CELL_SIZE) / 2;

        // VELIČINA sprajta treba da bude fiksna u odnosu na ORIGINALNU definiciju
        // Rotacija će se pobrinuti za ostalo
        const visualWidth = def.width * CELL_SIZE;
        const visualHeight = def.height * CELL_SIZE;

        return (
          <AnimatedObject
            key={inst.instanceId}
            def={def}
            x={posX}
            y={posY}
            width={visualWidth} // Originalna širina
            height={visualHeight} // Originalna visina
            rotation={inst.rotation}
          />
        );
      })}
    </>
  );
};
