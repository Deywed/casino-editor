// src/components/pixi/InstancesLayer.tsx
import {
  OBJECT_CATALOG,
  type CasinoObjectInstance,
} from "../../../core/ObjectDefinitions";
import { CasinoObject } from "../components/CasinoObject";

export interface InstancesLayerProps {
  instances: CasinoObjectInstance[];
}

export const InstancesLayer = ({ instances }: InstancesLayerProps) => {
  return (
    <>
      {instances.map((inst) => {
        const def = OBJECT_CATALOG[inst.typeId];

        // Renderuj pametnu komponentu umesto običnog Sprite-a
        return <CasinoObject key={inst.instanceId} instance={inst} def={def} />;
      })}
    </>
  );
};
