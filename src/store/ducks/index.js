import { combineReducers } from 'redux';

import localPodcastsManager from './localPodcastsManager';
import subject from './subject';
import author from './author';
import player from './player';

export default combineReducers({
  localPodcastsManager,
  subject,
  author,
  player,
});
