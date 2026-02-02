import {
  type FloorMap,
  type TileType,
  TILE_VOID,
  TILE_FLOR,
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

  return floor[y][x] === TILE_FLOR;
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
