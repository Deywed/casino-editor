import slotImg from "../assets/slot.png";
import slotSheetImg from "../assets/edited_slot.png";
import ruletImg from "../assets/rulet.png";

export type Footprint = number[][];

export interface AnimationConfig {
  sheetUrl: string; // Putanja do sprite sheet slike
  frameWidth: number; // Širina jednog frejma u pikselima (na sheet-u)
  frameHeight: number; // Visina jednog frejma u pikselima (na sheet-u)
  numberOfFrames: number; // Ukupan broj frejmova u sheet-u
}

export interface CasinoObjectDef {
  typeId: string;
  name: string;
  width: number;
  height: number;
  footprint: Footprint;
  imgSrc?: string;
  animation?: AnimationConfig;
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
    height: 3,
    footprint: [
      [1, 1],
      [1, 1],
      [1, 1],
    ],
    imgSrc: slotImg,
    animation: {
      sheetUrl: slotSheetImg,
      frameWidth: 16,
      frameHeight: 41,
      numberOfFrames: 16,
    },
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
