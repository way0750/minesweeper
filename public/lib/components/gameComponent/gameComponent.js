import React, {Component} from 'react';
import Board from './boardComponent/boardComponent.js';
import MyStory from './myStoryComponent/myStoryComponent.js';

import ChoicePanel from './choicePanelComponent/choicePanel.js';
import {connect} from 'react-redux';


const Game = React.createClass({

 render () {
   return (
          <div>
            <Board>
              {this.props.progress === 'inProgress' ? undefined : <MyStory />}
            </Board> 
            <div>
              <ChoicePanel />
            </div>
          </div>
        );
  }

});


function mapStateToProps(state) {
  return {
    progress: state.progress
  };
}

 export default connect(mapStateToProps)(Game);
