import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers/index.js';

let store = createStore(reducers);

import Game from './components/gameComponent/gameComponent.js';


const App = React.createClass({

  componentDidMount () {
    this.d3Node = d3.select(ReactDOM.findDOMNode(this));
    //scroll
    window.addEventListener('scroll', function (event) {
      var eleHeight = document.getElementById('board').offsetHeight;
      // var w = window.innerWidth;
      var h = window.innerHeight * 0.4;
      // getBoundingClientRect read only, shows top right bottom left width and height of an element
      var where = document.getElementById('board').getBoundingClientRect();
      if (where.top < h && where.bottom > h) {
        console.log('scroll into view', h, window.innerHeight, where.top, where.bottom);
      }
    });

    window.addEventListener('resize', function(event) {
      var w = window.innerWidth;
      var h = window.innerHeight;
      console.log('got resize', w, h);
    });

  },

  render : function () {
    return (
      <div>
        <Game />
      </div>
      );
  }

});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("content")
);
