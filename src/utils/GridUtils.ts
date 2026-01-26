import {
    OBJECT_CATALOG,
    type CasinoObjectInstance,
} from "../core/ObjectDefinitions";

export interface GridPos {
    x: number;
    y: number;
}

export const getOccupiedCells = (instance: CasinoObjectInstance): GridPos[] => {
    const def = OBJECT_CATALOG[instance.typeId];
    if (!def) return [];

    const occupied: GridPos[] = [];

    for (let i = 0; i < def.height; i++) {
        for (let j = 0; j < def.height; j++) {
            if (def.footprint[i][j] === 1) {
                occupied.push({
                    x: instance.originX + i,
                    y: instance.originY + j,
                });
            }
        }
    }

    return occupied;
};

export const checkCollision = (
    obj1: CasinoObjectInstance,
    obj2: CasinoObjectInstance,
): boolean => {
    const cells1 = getOccupiedCells(obj1);
    const cells2 = getOccupiedCells(obj2);

    for (const c1 of cells1)
        for (const c2 of cells2)
            if (c1.x === c2.x && c1.y === c2.y) return true;

    return false;
};
