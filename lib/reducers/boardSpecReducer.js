export default function (previousState, action) {
  if (previousState === undefined) {
    return {
      x: 20,
      y: 10,
      bombAmount: 30
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
      y: Math.max(Math.min(previousState.y, 45), 10),
      bombAmount: Math.max(Math.min(previousState.bombAmount, 400), 30)
    };
  } else {
    return previousState;
  }
}
