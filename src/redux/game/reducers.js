import * as actionTypes from "./actionTypes";
import * as grid from "../../util/grid";
import * as minesweeper from "../../game/minesweeper";

const initialState = {
  board: [],
  mines: 0,
  marked: 0,
  turns: 0,
  gameOver: false,
  died: false,
  won: false
};

export default function favorites(state = initialState, action) {
  switch (action.type) {
    case actionTypes.RESET_GAME:
      const { width, height, mines } = action.payload;
      const newboard = minesweeper.createRandomBoard(width, height, mines);
      return {
        ...initialState,
        ...{
          board: newboard,
          mines
        }
      };
    case actionTypes.REVEAL_SQAURE:
      const { x, y } = action.payload;
      const turns = state.turns + 1;
      const board = minesweeper.revealSquare(state.board, x, y);
      const died = grid.getCell(board, x, y).mine;
      const won = minesweeper.gameStatus(state.board) === state.mines;
      const gameOver = died||won;
      return {
        ...state,
        ...{
          turns,
          board,
          died,
          won,
          gameOver
        }
      };
    default:
      return state;
  }
}
