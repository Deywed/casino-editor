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

        // Rotacija matrice
        const fp = rotateObject(def.footprint, inst.rotation);
        const currentCellsWide = fp[0].length;
        const currentCellsHigh = fp.length;

        //Kada rotiramo objekat koji nije simetrican, njegov centar se menja u odnosu na originalnu poziciju.
        //inst.originX * CELL_SIZE nam daje poziciju gornjeg levog ugla objekta
        //(currentCellsWide * CELL_SIZE) / 2 nam daje pomeraj do centra objekta u pikselima
        //na ovaj način dobijamo poziciju centra objekta u pikselima

        const posX =
          inst.originX * CELL_SIZE + (currentCellsWide * CELL_SIZE) / 2;
        const posY =
          inst.originY * CELL_SIZE + (currentCellsHigh * CELL_SIZE) / 2;

        const visualWidth = def.width * CELL_SIZE;
        const visualHeight = def.height * CELL_SIZE;

        return (
          <AnimatedObject
            key={inst.instanceId}
            def={def}
            x={posX}
            y={posY}
            width={visualWidth}
            height={visualHeight}
            rotation={inst.rotation}
          />
        );
      })}
    </>
  );
};
