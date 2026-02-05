import {
  OBJECT_CATALOG,
  type CasinoObjectInstance,
} from "../core/ObjectDefinitions";

// Ova funkcija utvrdjuje tacno koje celije zauzima instanca
// Prolazi kroz footprint objekta, uzimajuci u obzir rotaciju i poziciju instance
// i vraca Set stringova u formatu "x,y" koji predstavljaju zauzete celije na gridu
export const getOccupiedCells = (
  instance: CasinoObjectInstance
): Set<string> => {
  const obj = OBJECT_CATALOG[instance.typeId];
  const rotatedFootprint = rotateObject(obj.footprint, instance.rotation);
  const occupiedCells = new Set<string>();

  const instanceHeight = rotatedFootprint.length;
  const instanceWidth = rotatedFootprint[0]?.length;

  for (let y = 0; y < instanceHeight; y++) {
    for (let x = 0; x < instanceWidth; x++) {
      if (rotatedFootprint[y][x] === 1) {
        occupiedCells.add(`${instance.originX + x},${instance.originY + y}`);
      }
    }
  }
  return occupiedCells;
};

/* 
   funkcija koja proverava da li dolazi do kolizije izmedju dva objekta na gridu
   tako sto uporedjuje Setove zauzetih celija oba objekta
*/
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
  instances: CasinoObjectInstance[],
  rotation: number = 0
) {
  // kreira fejk instancu objekta sa zadatim parametrima kako bi
  // mogao da koristi funkicju checkCollision za proveru kolizije
  const newObj: CasinoObjectInstance = {
    instanceId: "preview",
    typeId,
    originX: x,
    originY: y,
    rotation,
  };

  for (const inst of instances) {
    if (checkCollision(newObj, inst)) {
      return true;
    }
  }
  return false;
}

//pomocna funckija koja rotira instancu za onoliko puta koliko je zadato u parametru
export function rotateObject(matrix: number[][], rotation: number) {
  let result = matrix;
  //delimo sa 90 jer se rotacija uvek vrsi za 90 stepeni
  const rotCount = rotation / 90;

  for (let i = 0; i < rotCount; i++) {
    result = rotate90(result);
  }
  return result;
}

//funckija koja rotira matricu za 90 stepeni u smeru kazaljke na satu
function rotate90(matrix: number[][]) {
  //translacija i rotacija matrice
  const height = matrix.length;
  const width = matrix[0].length;
  const rotated: number[][] = Array.from({ length: width }, () =>
    Array.from({ length: height }, () => 0)
  );

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      rotated[x][height - y - 1] = matrix[y][x];
    }
  }
  return rotated;
}

export function instanceFitsInGrid(
  instance: CasinoObjectInstance,
  rows: number,
  cols: number
): boolean {
  // funkcija proverava da li objekat staje u grid - služi da kada zelimo da smanjimo grid za jedan red ili jednu kolonu da
  // funkcija proveri koji sve objekti neće da stanu u novi grid i da ih obriše

  const def = OBJECT_CATALOG[instance.typeId];
  if (!def) return false;

  const fp = rotateObject(def.footprint, instance.rotation);
  const height = fp.length; // visina u ćelijama
  const width = fp[0]?.length ?? 0; // širina u ćelijama

  return (
    instance.originX >= 0 &&
    instance.originY >= 0 &&
    instance.originX + width <= cols &&
    instance.originY + height <= rows
  );
}

export function filterInstancesToFitGrid(
  instances: CasinoObjectInstance[],
  rows: number,
  cols: number
): CasinoObjectInstance[] {
  return instances.filter((inst) => instanceFitsInGrid(inst, rows, cols));
}

export const getOccupiedCellList = (
  instance: CasinoObjectInstance
): Array<{ x: number; y: number }> => {
  const obj = OBJECT_CATALOG[instance.typeId];
  const rotatedFootprint = rotateObject(obj.footprint, instance.rotation);
  const cells: Array<{ x: number; y: number }> = [];

  for (let y = 0; y < rotatedFootprint.length; y++) {
    for (let x = 0; x < rotatedFootprint[0].length; x++) {
      if (rotatedFootprint[y][x] === 1) {
        cells.push({ x: instance.originX + x, y: instance.originY + y });
      }
    }
  }

  return cells;
};

export const findInstanceAtCell = (
  instances: CasinoObjectInstance[],
  x: number,
  y: number
): CasinoObjectInstance | null => {
  const key = `${x},${y}`;

  for (const inst of instances)
    if (getOccupiedCells(inst).has(key)) return inst;

  return null;
};
