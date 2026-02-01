import slotImg from "../assets/slot.png";
import slotSheetImg from "../assets/SlotSheet.png";

export type Footprint = number[][];
export interface AnimationSequence {
  frames: number[]; // Niz indeksa frejmova, npr. [0, 1, 2, 3]
  speed?: number; // Brzina animacije (0.1 - 1.0)
  loop?: boolean;
}

export interface AnimationConfig {
  sheetUrl: string; // Putanja do sprite sheet slike
  frameWidth: number; // Širina jednog frejma u pikselima (na sheet-u)
  frameHeight: number; // Visina jednog frejma u pikselima (na sheet-u)
  sequences: {
    idle: AnimationSequence; // Obavezno stanje
    [key: string]: AnimationSequence; // Opciona stanja (spin, win, broken...)
  };
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
    height: 2,
    footprint: [
      [1, 1],
      [1, 1],
    ],
    imgSrc: slotImg,
    animation: {
      sheetUrl: slotSheetImg,
      frameWidth: 19, // <--- PRIMER: Zameni sa stvarnom širinom jednog frejma
      frameHeight: 32, // <--- PRIMER: Zameni sa stvarnom visinom
      sequences: {
        idle: { frames: [0, 1, 2, 3, 4], speed: 0.1, loop: true },
        spin: { frames: [10, 11, 12, 13, 14, 15], speed: 0.4, loop: true },
        win: { frames: [20, 21, 22, 23], speed: 0.2, loop: true },
      },
    },
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
    imgSrc: "roulette_2x2.png",
  },
};
