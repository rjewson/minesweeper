import reducer from "./reducers";
import * as actionType from "./actionTypes";
import * as actions from "./actions";

describe("Grid Reducer", () => {
  it("Should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      grid: []
    });
  });
});
