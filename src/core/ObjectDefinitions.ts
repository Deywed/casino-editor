import slotImg from "../assets/slot.png";
import ruletImg from "../assets/rulet.png";

export type Footprint = number[][];

export interface CasinoObjectDef {
  typeId: string;
  name: string;
  width: number;
  height: number;
  footprint: Footprint;
  imgSrc?: string;
}

export interface CasinoObjectInstance {
  instanceId: string;
  typeId: string;
  originX: number;
  originY: number;
  rotation: number;
}

export const OBJECT_CATALOG: Record<string, CasinoObjectDef> = {
  slot_1x1: {
    typeId: "slot_1x1",
    name: "Slot machine",
    width: 2,
    height: 2,
    footprint: [
      [1, 1],
      [1, 1],
    ],
    imgSrc: slotImg,
  },
  roulette_2x2: {
    typeId: "roulette_2x2",
    name: "Roulette Table",
    width: 4,
    height: 4,
    footprint: [
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
    ],
    imgSrc: ruletImg,
  },
};
