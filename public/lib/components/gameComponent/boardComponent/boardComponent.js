import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import makeAMove from './gameControl.js';
import ReactCSSTransitionGroup from "../../../../../node_modules/react/lib/ReactCSSTransitionGroup.js";

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
    let style = {
      cursor: "url(./warning.png), auto"
    };
    return (<tr key={rowIndex} style={style}>
        {rowObj.map( (cellObj, cellIndex) => {
          return (
              <td key={''+ rowIndex + cellIndex} style={style}>
                <button 
                style={style}
                className={ this.reveal(cellObj) + ' cell' }
                onClick = { () => {
                    if (this.props.progress !== 'inProgress') {return; }
                    this.props.makeAMove(this.props.matrix, cellObj.x, cellObj.y, this.props.userActionType);
                  }
                }
                >
                <span style={style} > { cellObj.bombCount} </span>
                </button>
              </td>
            );
        })}
      </tr>);
  },

  render () {
    let style = {
      cursor: "url('./warning.png') auto"
    };
      // cursor: "url(../../../../assets/texture/warning.png) 60 60, auto"
    return (
        <div className="board" style={style}> 
          <table  className="mineMap" style={style}>
            <tbody style={style}>
             {this.props.matrix.whole.map(this.makeCells)}
            </tbody>
          </table>
        </div>
      );
  }
});



function mapStateToProps (state) {
  return {
    matrix: state.matrix,
    userActionType: state.userActionType,
    progress: state.progress
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    makeAMove: makeAMove
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
