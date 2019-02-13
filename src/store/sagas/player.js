import { call, put } from 'redux-saga/effects';

import { Creators as PlayerCreators } from '../ducks/player';

export function* setPodcast() {
  try {
  } catch (err) {}
}

export function* playPrevious() {
  /* const { podcast, playlist } = yield select(state => state.player);
  const previousPodcastIndex = playlist.findIndex(podcastFromPlaylist => podcastFromPlaylist._id === podcast._id) - 1;

  try {
    yield cps(RNSound.getCurrentTime, PODCAST_ID);
  } catch (currentTimeInSeconds) {
    const shouldRepeatSamePodcast = currentTimeInSeconds > 3;
    if (shouldRepeatSamePodcast) {
      yield put(ActionCreators.playerSetPodcastRequest(podcast, playlist));
      return;
    }

    if (previousPodcastIndex === -1) {
      yield put(ActionCreators.playerSetPodcastRequest(playlist[0], playlist));
    } else {
      yield put(ActionCreators.playerSetPodcastRequest(playlist[previousPodcastIndex], playlist));
    }
  } */
}
