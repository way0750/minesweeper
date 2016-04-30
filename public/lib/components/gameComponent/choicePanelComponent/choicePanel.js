import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const ChoicePanel = React.createClass({

  render () {

    return (
      <div className = "banner">
        <h1>Mine Sweeper</h1>
        <div className="clickActionType">
          <button onClick={ () => {this.props.updateUserAction('click'); } }> use shovel</button> 
          <button onClick={ () => {this.props.updateUserAction('placeFlag'); } }> place warning </button>
          <button onClick={ () => {
            let x = this.props.boardSpec.x;
            let y = this.props.boardSpec.y;
            let bombAmount = this.props.boardSpec.bombAmount;
            this.props.createNewGame(this.props.boardSpec); } 
          }> new game </button>
        </div>

        <div className="boardSpec">  
          <form onChange={(event)=>{ 
            let key = event.target.name;
            let value = event.target.value;
            this.props.updateBoardSpec(key, value, this.props.boardSpec[key]);
          }}>

            width: <input name='x' value={this.props.boardSpec.x}/> 
            height: <input name='y' value={this.props.boardSpec.y} /> 
            bombs: <input name='bombAmount' value={this.props.boardSpec.bombAmount}/> 
          </form>
        </div>

      </div>
      );
  }

});


function valueIsNumber (value) {
  //only number are permitted to enter the input field;
  return !(/[^0-9]/.test(value));
}


function updateBoardSpec (key, newValue, oldValue) {

  if (!valueIsNumber(newValue)) {
    newValue = oldValue;
  }

  return {
    type: "updateBoardSpec",
    payload: {
      key: key,
      value: +newValue
    }
  };
}

function updateUserAction (userActionName) {
  return {
    type: "ChangeUserActionType",
    payload: userActionName
  };
}

function createNewGame (boardSpec) {
  return {
    type: 'matrixGenerate',
    payload: boardSpec
  };
}

function mapStateToProps (state) {
  return {
    userActionName: state.userAction.name,
    userActionIcon: state.userAction.icon,
    boardSpec: state.boardSpec
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    updateUserAction: updateUserAction,
    createNewGame: createNewGame,
    updateBoardSpec: updateBoardSpec
  }, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(ChoicePanel);
