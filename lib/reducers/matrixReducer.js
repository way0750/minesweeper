import gameLogic from '../components/gameComponent/gameLogic.js';

export default function (previousState, action) {
  if (action.type === 'matrixUpdate') {
    return action.payload;
  } else if (previousState === undefined) {
      return gameLogic.makeMatrix(20, 10, 30);
  } else if (action.type === 'matrixGenerate') {
    return gameLogic.makeMatrix(
      Math.max(Math.min(action.payload.x, 45), 20),
      Math.max(Math.min(action.payload.y, 45), 10),
      Math.max(Math.min(action.payload.bombAmount, 400), 30)
      );
  } else if (action.type === 'placeFlag') {
    return action.payload;
  } else {
    return previousState;
  }
}
