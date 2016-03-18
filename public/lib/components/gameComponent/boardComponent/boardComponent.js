import React from 'react';

const Board = React.createClass({

  reveal (cellObj) {
    if (cellObj.revealed) {
      return cellObj.bombCount ? 'number' : 'foundNothing';
    } else if (cellObj.exploded) {
      return 'bomb';
    } else if (cellObj.flag) {
      return 'flag';
    }else {
      return 'covered';
    }
  },

  makeCells (rowObj, rowIndex) {
    return (<tr key={rowIndex}>
        {rowObj.map( (cellObj, cellIndex) => {
          return (
              <td key={''+ rowIndex + cellIndex}>
                <button 
                className={ this.reveal(cellObj) + ' cell' }
                onClick = { () => {
                    this.props.makeAMove(cellObj.x, cellObj.y);
                  }
                }
                >
                <span> { cellObj.bombCount} </span>
                </button>
              </td>
            );
        })}
      </tr>);
  },

  render () {
    let style = {
      cursor: "cell"
    };
    return (
        <div> 
          <h1> this is a big board here!</h1>
          <table className="board" style={style}>
            <tbody>
             {this.props.matrix.map(this.makeCells)}
            </tbody>
          </table>
        </div>
      );
  }

});

export default Board;
