import { Sprite } from "@pixi/react";
import {
  OBJECT_CATALOG,
  type CasinoObjectInstance,
} from "../../../core/ObjectDefinitions";
import { CELL_SIZE } from "../../../utils/Constants";

export interface InstancesLayerProps {
  instances: CasinoObjectInstance[];
}

export const InstancesLayer = ({ instances }: InstancesLayerProps) => {
  return (
    <>
      {instances.map((instance) => {
        const def = OBJECT_CATALOG[instance.typeId];
        return (
          <Sprite
            key={instance.instanceId}
            image={def.imgSrc}
            x={instance.originX * CELL_SIZE}
            y={instance.originY * CELL_SIZE}
            width={def.width * CELL_SIZE}
            height={def.height * CELL_SIZE}
          />
        );
      })}
    </>
  );
};
