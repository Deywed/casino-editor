import {
  OBJECT_CATALOG,
  type CasinoObjectInstance,
} from "../core/ObjectDefinitions";

export interface GridPos {
  x: number;
  y: number;
}

export const getOccupiedCells = (
  instance: CasinoObjectInstance
): Set<string> => {
  const obj = OBJECT_CATALOG[instance.typeId];
  const occupiedCells = new Set<string>();

  for (let y = 0; y < obj.height; y++) {
    for (let x = 0; x < obj.width; x++) {
      if (obj.footprint[y][x] === 1) {
        occupiedCells.add(`${instance.originX + x},${instance.originY + y}`);
      }
    }
  }
  return occupiedCells;
};

export const checkCollision = (
  a: CasinoObjectInstance,
  b: CasinoObjectInstance
): boolean => {
  const A = getOccupiedCells(a);
  const B = getOccupiedCells(b);

  for (const c of A) {
    if (B.has(c)) return true;
  }

  return false;
};

export function collides(
  x: number,
  y: number,
  typeId: string,
  instances: CasinoObjectInstance[]
) {
  const newObj: CasinoObjectInstance = {
    instanceId: "preview",
    typeId,
    originX: x,
    originY: y,
  };

  for (const inst of instances) {
    if (checkCollision(newObj, inst)) {
      return true;
    }
  }

  return false;
}
