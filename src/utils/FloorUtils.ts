import {
  type FloorMap,
  type TileType,
  TILE_VOID,
  TILE_FLOOR,
  TILE_OCCUPIED,
} from "../core/FloorDefinitions";

export const createFloor = (rows: number, cols: number): FloorMap => {
  const matrix: FloorMap = [];

  for (let i = 0; i < rows; i++) {
    const row: number[] = [];

    for (let j = 0; j < cols; j++) row.push(TILE_VOID);

    matrix.push(row);
  }

  return matrix;
};

export const isValidCoordinate = (
  floor: FloorMap,
  x: number,
  y: number,
): boolean => {
  return y >= 0 && y < floor.length && x >= 0 && x < floor[0].length;
};

export const isFloor = (floor: FloorMap, x: number, y: number): boolean => {
  if (!isValidCoordinate(floor, x, y)) return false;

  return floor[y][x] === TILE_FLOOR;
};

export const isOccupied = (floor: FloorMap, x: number, y: number): boolean => {
  if (!isValidCoordinate(floor, x, y)) return false;

  return floor[y][x] === TILE_OCCUPIED;
};

export const toggleTile = (
  floor: FloorMap,
  x: number,
  y: number,
  type: TileType,
) => {
  if (!isValidCoordinate(floor, x, y)) return;

  /* 
    kad bi samo pisalo newFloor[y][x] onda react to ne bi prepoznao jer je ista adresa u memoriji
    ovo je caka za react zato sto ako ostane ista adresa u memoriji on nece ponovo da iscrta 
    a ako react vidi nesto novo u memoriji i to uporedi sa starim stanjem videce promenu i iscrtace
    to brzo a inace bi proverio novo stanje sa starim ali po adresi koja je ista i nece da vidi promenu 
  */

  const newFloor = floor.map((row) => [...row]);
  newFloor[y][x] = type;

  return newFloor;
};

export const setTiles = (
  floor: FloorMap,
  cells: Array<{ x: number; y: number }>,
  type: TileType,
): FloorMap => {
  const newFloor = floor.map((row) => [...row]);

  for (const { x, y } of cells) {
    if (!isValidCoordinate(newFloor, x, y)) continue;

    newFloor[y][x] = type;
  }

  return newFloor;
};

export const resizeFloorPreserve = (
  floor: FloorMap,
  rows: number,
  cols: number,
): FloorMap => {
  const newFloor: FloorMap = [];

  for (let y = 0; y < rows; y++) {
    const row: TileType[] = [];

    for (let x = 0; x < cols; x++) row.push(floor[y]?.[x] ?? TILE_VOID);

    newFloor.push(row);
  }

  return newFloor;
};
