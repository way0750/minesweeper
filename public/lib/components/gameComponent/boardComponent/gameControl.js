import gameLogic from '../gameLogic.js';

function placeFlag (matrix, x, y) {
  matrix.whole[y][x].flag = !matrix.whole[y][x].flag;
  return {
    type: 'placeFlag',
    payload: {
      whole: matrix.whole,
      regularCells: matrix.regularCells,
      bombs: matrix.bombs,
      exploded: matrix.exploded
    }
  };
}

function clickToReveal (matrix, x, y) {
  if (matrix.exploded) {
    return {
      type: 'matrixUpdate',
      payload: matrix
    };
  }

  let updatedMatrix = gameLogic.clickToReveal(matrix, x, y);

  if (updatedMatrix.exploded) {
    updatedMatrix.bombs.forEach(function(cellObj) {
      cellObj.exploded = true;
    });
  }

  return {
    type: 'matrixUpdate',
    payload: {
    //must copy the updatedMatrix object
    //else redux state would not be updated for some reason
      whole: updatedMatrix.whole,
      regularCells: updatedMatrix.regularCells,
      bombs: updatedMatrix.bombs,
      exploded: updatedMatrix.exploded
    }
  };
}


function makeAMove(matrix, x, y, userActionType) {
  if (userActionType === 'click') {
    return clickToReveal(matrix, x, y);
  } else if (userActionType === 'placeFlag') {
    return placeFlag(matrix, x, y);
  }
}



export default makeAMove;
