import {
  select, delay, call, all, put,
} from 'redux-saga/effects';
import { SERVER_URL } from 'react-native-dotenv';

import { Creators as LocalPodcastsManagerCreators } from '../ducks/localPodcastsManager';
import { Creators as PlayerCreators } from '../ducks/player';
import api from '~/services/api';

const _findIndexInsideOriginalPlaylist = (
  originalPlaylist,
  podcastSearched,
) => {
  const index = originalPlaylist.findIndex(
    podcast => podcast.id === podcastSearched.id,
  );

  return index;
};

function* _getPodcastFromStorage(id) {
  const { podcastsDownloaded } = yield select(
    state => state.localPodcastsManager,
  );

  const podcastStored = podcastsDownloaded.filter(
    podcast => podcast.id === id,
  )[0];

  return podcastStored;
}

function* _definePodcastURI(podcast) {
  const podcastStored = yield _getPodcastFromStorage(podcast.id);

  const isPodcastStored = !!podcastStored
    && !!podcastStored.path
    && typeof podcastStored.path === 'string';

  const uri = isPodcastStored
    ? podcastStored.path
    : `${SERVER_URL}/podcasts/${podcast.id}/listen`;

  const podcastWithURI = {
    ...podcast,
    uri,
  };

  return podcastWithURI;
}

function* _getSecondsPassedSincePodcastStarted() {
  const { currentTime } = yield select(state => state.player);

  const [rawMinutes, rawSeconds] = currentTime.split(':');

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
    console.log('_rewindToPreviousPodcast');
  }
}

const _shufflePlaylistItems = (playlist) => {
  const shuffledPlaylist = Object.create(playlist);

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

  return shuffledPlaylist;
};

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

    const playlistWithoutCurrentPodcast = originalPlaylist.filter(
      podcast => podcast.id !== currentPodcast.id,
    );

    const shuffledPlaylist = _shufflePlaylistItems(
      playlistWithoutCurrentPodcast,
    );

    const currentPodcastIndexOnOriginalPlaylist = _findIndexInsideOriginalPlaylist(
      originalPlaylist,
      currentPodcast,
    );

    yield put(
      PlayerCreators.shufflePlaylistSuccess({
        originalPlaylistIndex: currentPodcastIndexOnOriginalPlaylist,
        playlist: [currentPodcast, ...shuffledPlaylist],
        playlistIndex: 0,
      }),
    );
  } catch (err) {
    console.log('shufflePlaylist');
  }
}

export function* setupPlayer() {
  try {
    yield call(setPodcast);
  } catch (err) {
    console.log('setupPlayer', 'err');
  }
}

export function* setupShufflePlayer({ payload }) {
  try {
    const { playlist } = payload;

    const shuffledPlaylist = _shufflePlaylistItems(playlist);

    yield put(
      PlayerCreators.shufflePlaylistSuccess({ playlist: shuffledPlaylist }),
    );

    yield call(setPodcast);
  } catch (err) {
    console.log('setupPlayer');
  }
}

export function* setPodcast() {
  try {
    const { playlistIndex, playlist } = yield select(state => state.player);

    const currentPodcast = playlist[playlistIndex];

    const podcastWithURI = yield _definePodcastURI(currentPodcast);

    yield delay(300); // Just for visual effects!

    yield all([
      put(PlayerCreators.setPodcastSuccess(podcastWithURI)),
      put(
        LocalPodcastsManagerCreators.addPodcastToRecentlyPlayedList(
          currentPodcast,
        ),
      ),
    ]);
  } catch (err) {
    console.log('err');
  }
}

function* _defineNextPodcast(nextPodcast, playlistIndex) {
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

function* _handleRestartPlayer(firstPodcast) {
  const { originalPlaylist } = yield select(state => state.player);

  let firstPodcastPlaylist = firstPodcast;

  const hasURIDefined = !!firstPodcastPlaylist.uri && typeof firstPodcastPlaylist.uri === 'string';

  if (!hasURIDefined) {
    firstPodcastPlaylist = yield _definePodcastURI(firstPodcastPlaylist);
  }

  const originalPlaylistIndex = _findIndexInsideOriginalPlaylist(
    originalPlaylist,
    firstPodcastPlaylist,
  );

  yield put(
    PlayerCreators.restartPlayer(originalPlaylistIndex, firstPodcastPlaylist),
  );
}

export function* repeatCurrentPodcast() {
  try {
    const { currentPodcast } = yield select(state => state.player);

    const podcastWithURI = yield _definePodcastURI(currentPodcast);

    yield delay(300);

    yield put(PlayerCreators.repeatCurrentPodcastSuccess(podcastWithURI));
  } catch (err) {
    console.log('err');
  }
}

export function* playNext() {
  try {
    const {
      shouldRepeatPlaylist,
      shouldRepeatCurrent,
      currentPodcast,
      backupPlaylist,
      playlistIndex,
      playlist,
    } = yield select(state => state.player);

    if (shouldRepeatCurrent) {
      return yield _defineNextPodcast(currentPodcast, playlistIndex);
    }

    const isLastPodcastOfPlaylist = playlistIndex === playlist.length - 1;
    const isLastPodcastShouldRepeatPlaylist = isLastPodcastOfPlaylist && shouldRepeatPlaylist;
    const isLastPodcastNotRepeatPlaylist = isLastPodcastOfPlaylist && !shouldRepeatPlaylist;
    const isPlaylistEmpty = playlist.length === 0;

    if (isLastPodcastNotRepeatPlaylist || isPlaylistEmpty) {
      return yield _handleRestartPlayer(backupPlaylist[0]);
    }

    if (isLastPodcastShouldRepeatPlaylist) {
      return yield _defineNextPodcast(playlist[0], 0);
    }

    if (!isLastPodcastOfPlaylist) {
      return yield _defineNextPodcast(
        playlist[playlistIndex + 1],
        playlistIndex + 1,
      );
    }
  } catch (err) {
    console.log('playNext');
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
    console.log('playPrevious');
  }
}
