import * as minesweeper from "./minesweeper";
import * as grid from "../util/grid";

const emptyBoard = minesweeper.createEmptyBoard(5, 5);

describe("Minesweeper", () => {
  const emptyBoard = minesweeper.createEmptyBoard(5, 5);

  it("Empty board is, empty", () => {
    expect(minesweeper.printBoard(emptyBoard)).toEqual(
      ["XXXXX", "XXXXX", "XXXXX", "XXXXX", "XXXXX"].join("\n")
    );
  });

  const place1 = grid.setCell(
    emptyBoard,
    2,
    2,
    minesweeper.createCell(2, 2, true, false, false)
  );

  const place2 = grid.setCell(
    place1,
    2,
    3,
    minesweeper.createCell(2, 3, true, false, false)
  );

  it("2 mines placed", () => {
    expect(minesweeper.printBoard(place2)).toEqual(
      ["XXXXX", "XXXXX", "XX*XX", "XX*XX", "XXXXX"].join("\n")
    );
  });

  const move1 = minesweeper.revealSquare(place2, 2, 1);

  it("Over 1 mine", () => {
    expect(minesweeper.printBoard(move1)).toEqual(
      ["XXXXX", "XX1XX", "XX*XX", "XX*XX", "XXXXX"].join("\n")
    );
  });

  const move2 = minesweeper.revealSquare(move1, 0, 0);
  it("Uncover all", () => {
    expect(minesweeper.printBoard(move2)).toEqual(
      ["00000", "01110", "02*20", "02*20", "01X10"].join("\n")
    );
  });
});
