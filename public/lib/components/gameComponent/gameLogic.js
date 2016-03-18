function makeMatrix (columnAmount=10, rowAmount=10, bombAmount=3) {
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
        matrix: matrix,
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

function clickToReveal (matrix, x, y, regularCells) {

    if (matrix[y][x].stat === 'bomb' ) {
        //true for game over    
        return true;
    }
    
    var surroundSqr = getSurroundSqrt(matrix, x, y);
    var surroundBombCount = surroundSqr.reduce( (bombCount, cell) => {
        return bombCount + (cell.stat === 'bomb' ? 1 : 0);
    }, 0 );
    
    matrix[y][x].revealed = true;
    //this cell has been revealed, so delete it from the regularCells to make it easier for checking winning condition
    console.log('deleting:', ''+y+x );
    delete regularCells[''+y+x];
    if (surroundBombCount === 0 ) {
        surroundSqr.forEach( (cell) => {
            if (!cell.revealed) {
                clickToReveal(matrix, cell.x, cell.y, regularCells);
            }
        } );
    } else {
        matrix[y][x].bombCount = surroundBombCount;
    }
    return false;
}

export default {
    makeMatrix: makeMatrix,
    getSurroundSqrt: getSurroundSqrt,
    clickToReveal: clickToReveal
};
