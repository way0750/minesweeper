function checkWinning (bombs, regularCells) {
  let allBombschecked = bombs.every( (cellObj) => {
    return cellObj.flag;
  });

  return allBombschecked && regularCells.length === 0;
}

export default function (previousState, action) {
  if (action.type === 'matrixUpdate' || action.type === 'placeFlag') {
    //check winning condition:
    if (action.payload.exploded) {
      return 'lost';
    } else {
      let gameWon = checkWinning(action.payload.bombs, Object.keys(action.payload.regularCells));
      return gameWon ? 'won' : 'inProgress';
    }
  } else if (action.type === 'matrixGenerate'){
    return 'inProgress';
  } else {
    return previousState || 'inProgress';
  }

}
