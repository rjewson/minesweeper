import * as actionTypes from "./actionTypes";

const initialState = {
  grid: []
};

export default function favorites(state = initialState, action) {
  switch (action.type) {
    case actionTypes.RESET_GAME:
      const { width, height, mines } = action.payload;
      const emptyGrid = [];
      return Object.assign({}, initialState, {
        grid: emptyGrid
      });
    default:
      return state;
  }
}
