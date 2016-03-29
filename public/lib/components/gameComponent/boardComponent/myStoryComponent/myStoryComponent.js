import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';

const MyStory = React.createClass({

  componentDidMount () {
    this.d3Node = d3.select(ReactDOM.findDOMNode(this));
    this.d3Node.style({
      opacity: 0
    });

    setTimeout( () => {
      this.d3Node.style({
        animation: "400ms cellAnimation",
        opacity: 1
      });
    }, 400);
  },
  
  render : function () {
    return (
      <div className = "myStory">
        <h1 className="gameResult"> {this.props.progress === 'lost' ? 'Oh No! ' : 'Alright! '}You {this.props.progress}!!!! </h1>
        <div className="appSpec">
          <h3>
            Mine Sweeper was built with these technologies:
          </h3>
          <ul>
            <li>1: React for view</li>
            <li>2: Redux for state management</li>
            <li>3: D3.js for animation</li>
            <li>4: Babel for compiling ES6 code</li>
            <li>5: Browserify for compiling all source code</li>
            <li>6: Grunt for automating tasks</li>
          </ul>
          <a href= "https://github.com/way0750/minesweeper"> Source Code on GitHub </a>
        </div>

      </div>
      );
  }

});

function mapStateToProps (state) {
  return {
    progress: state.progress
  };
}


export default connect(mapStateToProps)(MyStory);
