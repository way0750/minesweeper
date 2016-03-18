import React from 'react';

const ChoicePanel = React.createClass({

  render () {

    return (
      <div>
        <div onClick = { (event) => {
          this.props.setActionType(event.target.className);
        }}> 
          <button className = 'click'>click</button>
          <button className = 'flag'>flag</button>
        </div>
          <button onClick={this.props.startGame}></button>
        </div>
      );
  }

});

export default ChoicePanel;
