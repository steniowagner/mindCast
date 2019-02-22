import { combineReducers } from 'redux';

import fileManager from './fileManager';
import player from './player';

export default combineReducers({
  fileManager,
  player,
});
