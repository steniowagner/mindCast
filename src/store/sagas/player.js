import { call, select, put } from 'redux-saga/effects';

import { getItemFromStorage } from '~/utils/AsyncStorageManager';
import { Creators as PlayerCreators } from '../ducks/player';
import CONSTANTS from '~/utils/CONSTANTS';

const _findIndexInsideOriginalPlaylist = (
  originalPlaylist,
  podcastSearched,
) => {
  const index = originalPlaylist.findIndex(
    podcast => podcast.id === podcastSearched.id,
  );

  return index;
};

const _isPodcastAlreadyCached = async (currentPodcast) => {
  const rawPodcastsSaved = await getItemFromStorage(
    CONSTANTS.PODCASTS_SAVED,
    [],
  );

  const podcastsSaved = typeof rawPodcastsSaved === 'string'
    ? JSON.parse(rawPodcastsSaved)
    : rawPodcastsSaved;

  const podcastCached = podcastsSaved.filter(
    podcast => podcast.id === currentPodcast.id,
  )[0];

  return podcastCached;
};

const _definePodcastURI = async (currentPodcast) => {
  const podcastCached = await _isPodcastAlreadyCached(currentPodcast);

  const isPodcastAlreadyCached = !!podcastCached
    && !!podcastCached.path
    && typeof podcastCached.path === 'string';

  const uri = isPodcastAlreadyCached ? podcastCached.path : currentPodcast.url;

  const podcastWithURI = {
    ...currentPodcast,
    uri,
  };

  return podcastWithURI;
};

function* _getSecondsPassedSincePodcastStarted() {
  const { currentTime } = yield select(state => state.player);

  const rawMinutes = currentTime.split(':')[0];
  const rawSeconds = currentTime.split(':')[1];

  const minutes = parseInt(rawMinutes, 10);
  const seconds = parseInt(rawSeconds, 10);

  return minutes * 60 + seconds;
}

function* _rewindToPreviousPodcast(newPlaylistIndex) {
  try {
    const {
      shouldShufflePlaylist,
      originalPlaylistIndex,
      originalPlaylist,
      playlist,
    } = yield select(state => state.player);

    let newOriginalPlaylistIndex = originalPlaylistIndex;

    const previousPodcast = playlist[newPlaylistIndex];

    if (shouldShufflePlaylist) {
      newOriginalPlaylistIndex = _findIndexInsideOriginalPlaylist(
        originalPlaylist,
        previousPodcast,
      );
    }

    yield put(
      PlayerCreators.playPreviousSuccess({
        originalPlaylistIndex: newOriginalPlaylistIndex,
        playlistIndex: newPlaylistIndex,
        shouldRepeatCurrent: false,
      }),
    );
  } catch (err) {
    console.tron.log(err);
  }
}

export function* shufflePlaylist() {
  try {
    const {
      shouldShufflePlaylist,
      originalPlaylistIndex,
      originalPlaylist,
      currentPodcast,
    } = yield select(state => state.player);

    if (shouldShufflePlaylist) {
      return yield put(
        PlayerCreators.shufflePlaylistSuccess({
          playlistIndex: originalPlaylistIndex,
          playlist: originalPlaylist,
        }),
      );
    }

    const shuffledPlaylist = originalPlaylist.filter(
      podcast => podcast.id !== currentPodcast.id,
    );

    let currentIndex = shuffledPlaylist.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = shuffledPlaylist[currentIndex];
      shuffledPlaylist[currentIndex] = shuffledPlaylist[randomIndex];
      shuffledPlaylist[randomIndex] = temporaryValue;
    }

    shuffledPlaylist.unshift(currentPodcast);

    const currentPodcastIndexOnOriginalPlaylist = _findIndexInsideOriginalPlaylist(
      originalPlaylist,
      currentPodcast,
    );

    yield put(
      PlayerCreators.shufflePlaylistSuccess({
        originalPlaylistIndex: currentPodcastIndexOnOriginalPlaylist,
        playlist: shuffledPlaylist,
        playlistIndex: 0,
      }),
    );
  } catch (err) {
    console.tron.log(err);
  }
}

export function* setPodcast() {
  try {
    const { playlistIndex, playlist } = yield select(state => state.player);
    const currentPodcast = playlist[playlistIndex];

    const podcastWithURI = yield _definePodcastURI(currentPodcast);

    yield put(PlayerCreators.setPodcastSuccess(podcastWithURI));
  } catch (err) {
    console.tron.log(err);
  }
}

function* _defineNextPodcastWhenShouldRepeatPlaylist(
  nextPodcast,
  playlistIndex,
) {
  const {
    shouldShufflePlaylist,
    originalPlaylistIndex,
    originalPlaylist,
  } = yield select(state => state.player);

  let originalPlaylistCurrentIndex = originalPlaylistIndex;

  if (shouldShufflePlaylist) {
    originalPlaylistCurrentIndex = _findIndexInsideOriginalPlaylist(
      originalPlaylist,
      nextPodcast,
    );
  }

  yield put(
    PlayerCreators.playNextSuccess({
      originalPlaylistIndex: originalPlaylistCurrentIndex,
      currentPodcast: nextPodcast,
      playlistIndex,
    }),
  );

  yield call(setPodcast);
}

export function* playNext() {
  try {
    const {
      shouldRepeatPlaylist,
      originalPlaylist,
      playlistIndex,
      playlist,
    } = yield select(state => state.player);

    const isLastPodcastOfPlaylist = playlistIndex === playlist.length - 1;
    const isLastPodcastShouldRepeatPlaylist = isLastPodcastOfPlaylist && shouldRepeatPlaylist;
    const isLastPodcastNotRepeatPlaylist = isLastPodcastOfPlaylist && !shouldRepeatPlaylist;

    if (isLastPodcastShouldRepeatPlaylist) {
      yield _defineNextPodcastWhenShouldRepeatPlaylist(playlist[0], 0);
    }

    if (!isLastPodcastOfPlaylist) {
      yield _defineNextPodcastWhenShouldRepeatPlaylist(
        playlist[playlistIndex + 1],
        playlistIndex + 1,
      );
    }

    if (isLastPodcastNotRepeatPlaylist) {
      let firstPodcastPlaylist = playlist[0];

      const hasURIDefined = !!firstPodcastPlaylist.uri
        && typeof firstPodcastPlaylist.uri === 'string';

      if (!hasURIDefined) {
        firstPodcastPlaylist = yield _definePodcastURI(firstPodcastPlaylist);
      }

      const originalPlaylistIndex = _findIndexInsideOriginalPlaylist(
        originalPlaylist,
        firstPodcastPlaylist,
      );

      yield put(
        PlayerCreators.restartPlayer(
          originalPlaylistIndex,
          firstPodcastPlaylist,
        ),
      );
    }
  } catch (err) {
    console.tron.log(err);
  }
}

export function* playPrevious() {
  try {
    const secondsPassedSincePodcastStarted = yield _getSecondsPassedSincePodcastStarted();

    if (secondsPassedSincePodcastStarted <= 3) {
      const { shouldRepeatPlaylist, playlistIndex, playlist } = yield select(
        state => state.player,
      );

      if (playlistIndex === 0 && shouldRepeatPlaylist) {
        yield _rewindToPreviousPodcast(playlist.length - 1);
      }

      if (playlistIndex === 0 && !shouldRepeatPlaylist) {
        yield put(
          PlayerCreators.playPreviousSuccess({
            shouldRepeatCurrent: false,
          }),
        );
      }

      if (playlistIndex !== 0) {
        yield _rewindToPreviousPodcast(playlistIndex - 1);
      }
    }

    if (secondsPassedSincePodcastStarted > 3) {
      yield put(PlayerCreators.playPreviousSuccess({}));
    }

    yield call(setPodcast);
  } catch (err) {
    console.tron.log(err);
  }
}
