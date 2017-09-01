import reducer from "./reducers";
import * as actionType from "./actionTypes";
import * as actions from "./actions";
import * as minesweeper from "../../game/minesweeper";

describe("Grid Reducer", () => {
  it("Should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      board: [],
      mines: 0,
      marked: 0,
      turns: 0,
      gameOver: false,
      died: false,
      won: false
    });
  });

  const emptyStartState = reducer(undefined, actions.startGame(3, 3, 0));

  it("Should handle RESET_GAME", () => {
    expect(minesweeper.printBoard(emptyStartState.board)).toEqual(
      ["XXX", "XXX", "XXX"].join("\n")
    );

    expect(minesweeper.gameStatus(emptyStartState.board)).toEqual(0);
  });

  const finishedState = reducer(emptyStartState, actions.revealSquare(0, 0));

  it("Should handle move on empty board", () => {
    expect(minesweeper.printBoard(finishedState.board)).toEqual(
      ["000", "000", "000"].join("\n")
    );
    expect(minesweeper.gameStatus(finishedState.board)).toEqual(3*3);
    
  });
});
