import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import makeAMove from './gameControl.js';
import MyStory from './myStoryComponent/myStoryComponent.js';

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

//this works!!!!!!!
// let style = {
//       cursor: "url(https://cdn4.iconfinder.com/data/icons/pixel-web-part-1/512/pointer1-128.png) 50 50, auto"
//     };
// to get different cursor in react:
// url must be actual url, no referral to local resources like ./aaa/aaa.aaa
// image size have to be 128 X 128 or smaller

  makeCells (rowObj, rowIndex) {
    let style = {
      cursor: "url(" + this.props.userActionIcon + ") 10 20, auto"
    };
    return (<tr key={rowIndex} style={style}>
        {rowObj.map( (cellObj, cellIndex) => {
          return (
              <td key={''+ rowIndex + cellIndex} style={style}>
                <button 
                style={style}
                className={ this.reveal(cellObj) + ' cell' }
                onClick = { (event) => {
                    if (this.props.progress !== 'inProgress' || cellObj.flag) {
                      return;
                    } else {
                      this.props.makeAMove(this.props.matrix, cellObj.x, cellObj.y, this.props.userActionName);
                    }
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

        // <MyStory />
  render () {
    return (
        <div className="board"> 
          {this.props.progress === 'inProgress' ? '' : <MyStory /> }
          <table  className="mineMap">
            <tbody >
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
    userActionName: state.userAction.name,
    userActionIcon: state.userAction.icon,
    progress: state.progress
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    makeAMove: makeAMove
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
