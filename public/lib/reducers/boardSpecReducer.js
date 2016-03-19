export default function (previousState, action) {
  if (previousState === undefined) {
    return {
      x: 20,
      y: 10,
      bombAmount: 10
    };
  } else if (action.type === 'updateBoardSpec') {
    previousState[action.payload.key]= action.payload.value;
    return {
      x: previousState.x,
      y: previousState.y,
      bombAmount: previousState.bombAmount
    };
  } else if (action.type === 'matrixGenerate') {
    return {
      x: Math.max(Math.min(previousState.x, 45), 20),
      y: Math.max(Math.min(previousState.y, 45), 20),
      bombAmount: Math.max(Math.min(previousState.bombAmount, 20), 10)
    };
  } else {
    return previousState;
  }
}
