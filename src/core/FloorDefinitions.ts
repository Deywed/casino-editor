export type TileType = number;

export type FloorMap = TileType[][];

export const TILE_VOID: TileType = 0;
export const TILE_FLOR: TileType = 1;
export const TILE_OCCUPIED: TileType = 2;

export const DEFAULT_GRID_SIZE = {
  rows: 50,
  cols: 50,
};
