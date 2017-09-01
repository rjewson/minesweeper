import * as grid from "../util/grid";

export const createCell = (
  x = 0,
  y = 0,
  mine = false,
  visible = false,
  adjacentCount = 0,
  marked = false
) => ({
  x,
  y,
  mine,
  visible,
  adjacentCount,
  marked
});

const ADJACENT_OFFSETS = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  /*[0,0],*/
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1]
];

export const createEmptyBoard = (width, height) =>
  grid.initGrid(width, height, (x, y) => createCell(x, y));

const randomIntRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

//Init random board.  Dont care about immutabilty here...
export const createRandomBoard = (width, height, mines) => {
  const board = createEmptyBoard(width, height);
  while (mines > 0) {
    const position = [
      randomIntRange(0, width - 1),
      randomIntRange(0, height - 1)
    ];
    const cell = grid.getCell(board, ...position);
    if (!cell.mine) {
      cell.mine = true;
      mines--;
    }
  }
  return board;
};

const cellAtCoord = (board, coord) => grid.getCell(board, coord[X], coord[Y]);

// This is the 'game' logic for minesweeper.
// Immutability requirements make it mroe verbose that it might need to have been
export const revealSquare = (board, x, y) => {
  //Get the inital cell, make it visible
  const startCellValue = grid.getCell(board, x, y);
  let result = grid.setCell(board, x, y, {
    ...startCellValue,
    visible: true
  });

  //If its a mine, just return
  if (startCellValue.mine) return result;

  //Initalize a queue
  let q = [[x, y]];

  while (q.length > 0) {
    //While there is something in the queue, remove it
    const cellCoords = q.pop();
    //Calculate all the valid adjacent cells
    const validAdjacentCells = ADJACENT_OFFSETS.map(([x, y]) => [
      cellCoords[0] + x,
      cellCoords[1] + y
    ]).filter(
      ([x, y]) => x >= 0 && y >= 0 && x < board.length && y < board[0].length
    );

    //Sum up the adjacent mines
    const adjacentCount = validAdjacentCells.reduce(
      (sum, adjacentCellCoords) =>
        grid.getCell(result, ...adjacentCellCoords).mine ? sum + 1 : sum,
      0
    );

    if (adjacentCount > 0) {
      //Set this cell to be visible, and display the adjacent count
      result = grid.setCell(result, ...cellCoords, {
        ...grid.getCell(result, ...cellCoords),
        adjacentCount,
        visible: true
      });
    } else {
      //First, append the non-visible adjacent cells to the queue
      q = [
        ...q,
        ...validAdjacentCells.filter(
          cell => !grid.getCell(result, ...cell).visible
        )
      ];
      //Now, set all these visible
      validAdjacentCells.forEach(emptyAdjacent => {
        result = grid.setCell(result, ...emptyAdjacent, {
          ...grid.getCell(result, ...emptyAdjacent),
          visible: true
        });
      });
    }
  }
  return result;
};

export const toggleSquareMarker = (board, x, y) => {
  const cell = grid.getCell(board, x, y);
  return grid.setCell(board, x, y, {
    ...cell,
    marked: !cell.marked
  });
};

export const gameStatus = board =>
  board.reduce(
    (total, column) =>
      total + column.reduce((result, cell) => result + cell.visible, 0),
    0
  );

export const cellToString = cell => {
  if (cell.mine) return cell.visible ? "M" : "*";
  return cell.visible ? cell.adjacentCount : "X";
};

export const printBoard = board => {
  const width = board.length;
  const height = board[0].length;
  let result = "";
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      result += cellToString(grid.getCell(board, x, y));
    }
    if (y != width - 1) result += "\n";
  }
  return result;
};
