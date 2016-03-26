import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

const Cell = React.createClass({

  componentDidMount () {
    this.d3Node = d3.select(ReactDOM.findDOMNode(this));
    this.d3Node.classed({
      cell: true, 
      covered: true
    });
  },

  componentDidUpdate () {
    //let d3 handle the visual never let add or delete anything from DOM
    //if an element is not deleted then it will stay in the DOM and all of its attributes might maintain
    //might need to reset everything
    //
    //rset all class to initial state else they will persist through out all sub sequence games
    
    this.d3Node.classed({
      cell: true, 
      covered: true,
      bomb: false,
      foundNothing: false,
      number: false,
      flag: false
    });

    let cellObj = this.props.cellObj;
    if (cellObj.revealed) {
      if (cellObj.bombCount) {
        this.d3Node.classed({covered: false, number: true});
      } else {
        this.d3Node.classed({covered: false, foundNothing: true});
      }
    } else if (cellObj.exploded) {
      this.d3Node.classed({covered: false, bomb: true});
    } else if (cellObj.flag) {
      this.d3Node.classed({covered: false, flag: true});
    }else {
      this.d3Node.classed({covered: true});
    }
  },

  render () {
  let style = {
      cursor: "url(" + this.props.userActionIcon + ") 10 20, auto"
    };
    return (
      <button style={style} onClick = {() => {this.props.makeAMove(); }}>
      <span style={style} > { this.props.cellObj.bombCount} </span>
      </button>
      );
  }

});

function mapStateToProps (state) {
  return {
   progress: state.progress
  };
}

export default connect(mapStateToProps)(Cell);

