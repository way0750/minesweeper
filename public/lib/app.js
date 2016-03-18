import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import reducer from './reducers/index';

// let store = createStore(reducer);

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

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById("content")
// );

ReactDOM.render(
  <App />,
  document.getElementById("content")
);
