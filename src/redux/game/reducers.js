import * as actionTypes from "./actionTypes";
import * as grid from "../../util/grid";

const initialState = {
  grid: []
};

export default function favorites(state = initialState, action) {
  switch (action.type) {
    case actionTypes.RESET_GAME:
      const { width, height, mines } = action.payload;
      const emptyGrid = grid.initGrid(width, height, ()=>0);
      return Object.assign({}, initialState, {
        grid: emptyGrid
      });
    default:
      return state;
  }
}
