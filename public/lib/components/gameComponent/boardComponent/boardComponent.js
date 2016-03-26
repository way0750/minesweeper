import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import makeAMove from './gameControl.js';
import MyStory from './myStoryComponent/myStoryComponent.js';
import Cell from './cellComponent/cellComponent.js';

import ReactCSSTransitionGroup from "../../../../../node_modules/react/lib/ReactCSSTransitionGroup.js";


const Board = React.createClass({
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
    return (
      <tr key={rowIndex} style={style}>
        {rowObj.map( (cellObj, cellIndex) => {
          return (
              <td key={''+ rowIndex + cellIndex} style={style}>
              <Cell 
              style={style}
              cellObj={cellObj}
              userActionIcon={this.props.userActionIcon}
              makeAMove = { (event) => {
                    if (this.props.progress !== 'inProgress' || (this.props.userActionName === 'click' && cellObj.flag)) {
                      return;
                    } else {
                      this.props.makeAMove(this.props.matrix, cellObj.x, cellObj.y, this.props.userActionName);
                    }
                  }
                }
                />
              </td>
            );
        })}
      </tr>
      );
  },

  componentDidMount () {
      this.d3Node = d3.select(ReactDOM.findDOMNode(this));
      this.d3Node.style({opacity: 0});
      setTimeout( () => {
        this.d3Node.style({animation: "400ms cellAnimation", opacity: 1});
      }, 200);
    },

  render () {

    return (
      
        <div className="board" id="board"> 
        {this.props.progress === 'inProgress' ? '' :  <MyStory />}
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
