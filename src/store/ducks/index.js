import { combineReducers } from 'redux';

import localPodcastsManager from './localPodcastsManager';
import author from './author';
import player from './player';

export default combineReducers({
  localPodcastsManager,
  author,
  player,
});
