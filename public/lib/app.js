import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers/index.js';

let store = createStore(reducers);

import Game from './components/gameComponent/gameComponent.js';


const App = React.createClass({

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
