export type Footprint = number[][];

export interface CasinoObjectDef {
    typeId: string;
    name: string;
    width: number;
    height: number;
    footprint: Footprint;
}

export interface CasinoObjectInstance {
    instanceId: string;
    typeId: string;
    originX: number;
    originY: number;
}

export const OBJECT_CATALOG: Record<string, CsinoObjectDef> = {
    slot_1x1: {
        typeId: "slot_1x1",
        name: "Slot machine",
        width: 2,
        heigh: 2,
        footprint: [
            [1, 1],
            [1, 1],
        ],
    },
    roulette_2x2: {
        typeId: "roullete_2x2",
        name: "Roullete",
        width: 4,
        height: 4,
        footprint: [
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
        ],
    },
};
