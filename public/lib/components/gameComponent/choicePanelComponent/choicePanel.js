import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const ChoicePanel = React.createClass({

  render () {
    console.log('rendered choicepanel');
    return (
      <div className = "banner">
        <div className="clickActionType">
          <h1>Mine Sweeper</h1>
          <button onClick={ () => {this.props.updateUserAction('click'); } }> click </button> 
          <button onClick={ () => {this.props.updateUserAction('placeFlag'); } }> flag </button>
        </div>

        <div className="boardSpec">  
          <button onClick={ () => {
            let x = this.props.boardSpec.x;
            let y = this.props.boardSpec.y;
            let bombAmount = this.props.boardSpec.bombAmount;
            console.log('what is this:',this.props.boardSpec);
            this.props.createNewGame(this.props.boardSpec); } 
          }> new game </button>

          <form onChange={(event)=>{ 
            let key = event.target.name;
            let value = event.target.value;
            this.props.updateBoardSpec(key, value, this.props.boardSpec[key]);
          }}>

            width_<input name='x' value={this.props.boardSpec.x}/>
            height_<input name='y' value={this.props.boardSpec.y} />
            bombs_<input name='bombAmount' value={this.props.boardSpec.bombAmount}/>

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

function updateUserAction (userActionType) {
  return {
    type: "ChangeUserActionType",
    payload: userActionType
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
    userActionType: state.userActionType,
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
