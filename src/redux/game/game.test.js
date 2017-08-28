import reducer from "./reducers";
import * as actionType from "./actionTypes";
import * as actions from "./actions";

describe("Grid Reducer", () => {
  it("Should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      grid: []
    });
  });

  it("Should handle RESET_GAME", () => {
    expect(reducer(undefined, actions.startGame(3, 3, 5))).toEqual({
      grid: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    });
  });
});
