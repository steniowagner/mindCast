import { combineReducers } from 'redux';

import localPodcastsManager from './localPodcastsManager';
import player from './player';

export default combineReducers({
  localPodcastsManager,
  player,
});
