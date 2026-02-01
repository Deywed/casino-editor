import { Sprite } from "@pixi/react";
import {
  OBJECT_CATALOG,
  type CasinoObjectInstance,
} from "../../../core/ObjectDefinitions";
import { CELL_SIZE } from "../../../utils/Constants";
import { rotateObject } from "../../../utils/GridUtils";

export interface InstancesLayerProps {
  instances: CasinoObjectInstance[];
}

export const InstancesLayer = ({ instances }: InstancesLayerProps) => {
  return (
    <>
      {instances.map((inst) => {
        const def = OBJECT_CATALOG[inst.typeId];

        // footprint posle rotacije — daje nove dimenzije
        const fp = rotateObject(def.footprint, inst.rotation);

        const width = fp[0].length * CELL_SIZE;
        const height = fp.length * CELL_SIZE;

        return (
          <Sprite
            key={inst.instanceId}
            image={def.imgSrc}
            anchor={0.5}
            x={inst.originX * CELL_SIZE + width / 2}
            y={inst.originY * CELL_SIZE + height / 2}
            width={width}
            height={height}
            angle={inst.rotation}
          />
        );
      })}
    </>
  );
};
