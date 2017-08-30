import * as grid from "./grid";

test("Initalize grid - width", () => {
  expect(grid.initGrid(10, 10, ()=>1)).toHaveLength(10);
});

const expected = [[9, 9, 9], [9, 9, 9], [9, 9, 9]];

test("Initalize grid - 2d 3x3 9", () => {
  expect(grid.initGrid(3, 3, ()=>9)).toEqual(expect.arrayContaining(expected));
});

const testGrid0 = grid.initGrid(5, 5, ()=>0);
test("Get cell 0,0 = 0", () => {
  expect(grid.getCell(testGrid0, 0, 0)).toEqual(0);
});

const testGrid1 = grid.setCell(testGrid0, 0, 0, 1);
test("Get cell 0,0 = 1", () => {
  expect(grid.getCell(testGrid1, 0, 0)).toEqual(1);
});

test("Immutability check grid0 !== grid1", () => {
  expect(testGrid0).not.toEqual(testGrid1);
});

test("Immutability check grid0[0] !== grid1[0]", () => {
  expect(testGrid0[0]).not.toEqual(testGrid1[0]);
});

test("Immutability check grid0[1] === grid1[1]", () => {
  expect(testGrid0[1]).toEqual(testGrid1[1]);
});

