function makeMatrix (columnAmount, rowAmount, bombAmount) {
    //total size should not be larger than 2000

    var matrix = [], regularCells = {};
    for (var i = 0; i < rowAmount ; i++){
        matrix[i] = [];
        for (var j = 0; j < columnAmount; j++) {
            var cell = {
                x: j,
                y: i,
                stat: 'blank',
                revealed: false,
                flag: false
            };
            matrix[i][j] = cell;
            regularCells[''+i+j] = cell;
        }
    }
    
    var randomX, randomY, bombs = [];
    bombAmount = columnAmount * rowAmount < bombAmount ? columnAmount * rowAmount : bombAmount;
    while (bombAmount) {
        randomX = Math.floor( Math.random() * columnAmount );
        randomY = Math.floor( Math.random() * rowAmount );
        var cellObj = matrix[randomY][randomX];
        if (cellObj.stat !== 'bomb') {
            cellObj.stat = 'bomb';
            cellObj.exploded = false;
            bombs.push(cellObj);
            delete regularCells[''+randomY+randomX];
            bombAmount--;
        }
    }
    
    return {
        whole: matrix,
        bombs: bombs,
        regularCells: regularCells
    };
}


function getSurroundSqrt (matrix, x, y) {
    var topRow = (matrix[y-1] || []).slice(Math.max(x-1, 0), x+2);
    var bottomRow = (matrix[y+1] || []).slice(Math.max(x-1, 0), x+2);
    var leftCell = x - 1 < 0 ? [] : matrix[y].slice(x-1, x);
    var rightCell = matrix[y].slice(x+1, x+2);
    return topRow.concat(leftCell, rightCell, bottomRow);
}


function clickToReveal (matrix, x, y) {

    if (matrix.whole[y][x].stat === 'bomb' ) {
        //true for game over
        matrix.exploded = true;   
        return matrix;
    }
    
    var surroundSqr = getSurroundSqrt(matrix.whole, x, y);
    var surroundBombCount = surroundSqr.reduce( (bombCount, cell) => {
        return bombCount + (cell.stat === 'bomb' ? 1 : 0);
    }, 0 );
    
    matrix.whole[y][x].revealed = true;
    //this cell has been revealed, so delete it from the regularCells to make it easier for checking winning condition
    delete matrix.regularCells[''+y+x];
    if (surroundBombCount === 0 ) {
        surroundSqr.forEach( (cell) => {
            if (!cell.revealed) {
                clickToReveal(matrix, cell.x, cell.y);
            }
        } );
    } else {
        matrix.whole[y][x].bombCount = surroundBombCount;
    }
    return matrix;
    
}

export default {
    makeMatrix: makeMatrix,
    clickToReveal: clickToReveal
};
