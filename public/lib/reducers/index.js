import {combineReducers} from 'redux';

import gameProgressReducer from './gameProgressReducer.js';
import userActionTypeReducer from  './userActionTypeReducer.js';
import matrixReducer from './matrixReducer.js';
import boardSpecReducer from './boardSpecReducer.js';

export default combineReducers({
  progress: gameProgressReducer,
  userActionType: userActionTypeReducer,
  matrix: matrixReducer,
  boardSpec: boardSpecReducer
});
