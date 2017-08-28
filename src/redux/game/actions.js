import * as actionTypes from './actionTypes';

export function startGame(width, height, mines) {
  return {
      type: actionTypes.RESET_GAME,
      payload: {
          width,
          height,
          mines
      }
  };
}

export function revealSquare(x,y) {
  return {
      type: actionTypes.REVEAL_SQAURE,
      payload: {
          x,y
      }
  };
}

export function markSquare(x,y) {
  return {
      type: actionTypes.MARK_SQAURE,
      payload: {
          x,y
      }
  };
}