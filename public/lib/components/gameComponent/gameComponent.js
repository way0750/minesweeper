import React, {Component} from 'react';
import Board from './boardComponent/boardComponent.js';

import ChoicePanel from './choicePanelComponent/choicePanel.js';
import {connect} from 'react-redux';


const Game = React.createClass({

 render () {
   return (
          <div>
            <div>
              <ChoicePanel />
            </div>
            <Board />
          </div>
        );
  }

});
            // {this.props.progress === 'inProgress' ? undefined : <MyStory />}


function mapStateToProps(state) {
  return {
    progress: state.progress
  };
}

 export default connect(mapStateToProps)(Game);
