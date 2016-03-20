import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';

const MyStory = React.createClass({
  
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
            <li>3: Babel for compiling ES6 code</li>
            <li>4: Browserify for compiling all source code</li>
            <li>5: Grunt for automating tasks</li>
          </ul>
          <a href= "http://www.google.com"> Source Code on GitHub </a>
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
