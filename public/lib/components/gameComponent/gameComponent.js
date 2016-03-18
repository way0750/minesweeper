import React, {Component} from 'react';
import Borad from './boardComponent/boardComponent.js';
import ChoicePanel from './choicePanelComponent/choicePanel.js';
import GameLogic from './gameLogic.js';


const Game = React.createClass({

  getInitialState : function () {
    let game = GameLogic.makeMatrix();
    return {
      matrix : game.matrix,
      bombs: game.bombs,
      regularCells: game.regularCells,
      actionType: 'click',
      gameLost: false,
      gameWon: false
    };
  },

  setActionType: function(type) {
    this.setState({actionType: type});
  },

  checkWinning: function (bombs, regularCells) {
    //check all bombs and see if they are all flagged
    //and check all regular cell see if they are all revealed
    let foundAllBombs = bombs.every( (cellObj) => {
      return cellObj.flag;
    });
    let remainingCells = Object.keys(regularCells);
    return foundAllBombs && remainingCells.length===0;
  },

  startGame () {
    this.setState(this.getInitialState());
  },

  makeAMove (x, y) {
    if (this.state.gameLost || this.state.gameWon) {
      return;
    }
    let cellObj = this.state.matrix[y][x];

    console.log('clicking at all?', this.state.actionType,!cellObj.flag);
    if (this.state.actionType === 'click' && !cellObj.flag) {
      let gameLost = GameLogic.clickToReveal(this.state.matrix, x, y, this.state.regularCells);
      if (gameLost) {
        this.state.bombs.forEach( (cellObj) => {
          cellObj.exploded = true;
        } );
      }
      this.setState({gameWon: this.checkWinning(this.state.bombs, this.state.regularCells), gameLost: gameLost});

    } else if (this.state.actionType === 'flag' && !cellObj.reveal) {
      cellObj.flag = !cellObj.flag;
      this.setState({gameWon: this.checkWinning(this.state.bombs, this.state.regularCells)});
      
    }
  },

  render () {
    return (
        <div>
          <ChoicePanel setActionType={this.setActionType} startGame={this.startGame}/>
          <h1>{this.state.gameWon}</h1>
          <Borad matrix= {this.state.matrix} makeAMove={this.makeAMove} gameLost={this.state.gameLost}/>
        </div>
      );
  }

});


export default Game;
