export const initGrid = (width, height, initalValue) =>
  [...Array(width)].map((col, x) =>
    [...Array(height)].map((row, y) => initalValue(x, y))
  );

export const getCell = (grid, x, y) => grid[x][y];

export const setCell = (grid, x, y, value) => {
  const result = grid.map((c, i) => (i === x ? [...c] : c));
  result[x][y] = value;
  return result;
};

export const setCellDirty = (grid, x, y, value) => {
  grid[x][y] = value;
}