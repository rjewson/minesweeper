export const initGrid = (width, height, initalValue) =>
  [...Array(width)].map((c, i) => [...Array(height)].fill(initalValue));

export const getCell = (grid, x, y) => grid[x][y];

export const cloneCol = (grid, x, y) =>
  grid.map((c, i) => (i === x ? [...c] : c));

export const setCell = (grid, x, y, value) => {
  const result = cloneCol(grid, x, y);
  result[x][y] = value;
  return result;
};

export const setDiag = (grid, value) =>
  grid.forEach( (r, i) => (i < r.length ? (r[i] = value) : null));
