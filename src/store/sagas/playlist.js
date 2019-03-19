import {
  call, select, delay, put, all,
} from 'redux-saga/effects';

import { Creators as PlaylistCreators } from '../ducks/playlist';

import {
  removeItemFromStorage,
  persistItemInStorage,
  getItemFromStorage,
} from '~/utils/AsyncStorageManager';

import {
  downloadPodcast,
  stopPodcastDownload,
  removePodcastFromLocalStorage,
} from './localPodcastsManager';

import CONSTANTS from '~/utils/CONSTANTS';

export function* loadPlaylists() {
  try {
    const playlistsFromStorage = yield getItemFromStorage(
      CONSTANTS.KEYS.PLAYLIST_STORAGE_KEY,
      [],
    );

    const playlists = typeof playlistsFromStorage === 'string'
      ? JSON.parse(playlistsFromStorage)
      : [];

    yield put(PlaylistCreators.loadPlaylistsSuccess(playlists));
  } catch (err) {
    yield put(PlaylistCreators.loadPlaylistsFailure());
  }
}

export function* createPlaylist({ payload }) {
  try {
    const { playlists: playlistsCreated } = yield select(
      state => state.playlist,
    );
    const { title } = payload;

    const isPlaylistAlreadyCreated = playlistsCreated.some(
      playlist => playlist.title === title,
    );

    if (isPlaylistAlreadyCreated) {
      return yield put(
        PlaylistCreators.createPlaylistFailure(
          'A Playlist with this name already exists.',
        ),
      );
    }

    const playlists = [
      ...playlistsCreated,
      {
        isAvailableOffline: false,
        downloads: [],
        podcasts: [],
        title,
      },
    ];

    yield persistItemInStorage(CONSTANTS.KEYS.PLAYLIST_STORAGE_KEY, playlists);

    yield put(PlaylistCreators.createPlaylistSuccess(playlists));
  } catch (err) {
    yield put(
      PlaylistCreators.createPlaylistFailure(
        'An unexpected error happened. Sorry for that.',
      ),
    );
  }
}

function* _handlePersistsPlaylistsUpdated(playlist, podcasts) {
  const { playlists } = yield select(state => state.playlist);

  const playlistUpdated = {
    ...playlist,
    podcasts,
  };

  const playlistsUpdated = playlists.map(playlistFromState => (playlistFromState.title === playlist.title
    ? playlistUpdated
    : playlistFromState));

  yield persistItemInStorage(
    CONSTANTS.KEYS.PLAYLIST_STORAGE_KEY,
    playlistsUpdated,
  );

  return playlistsUpdated;
}

export function* addPodcast({ payload }) {
  try {
    const { playlist, podcast } = payload;

    let playlistUpdated = playlist;

    if (playlist.isAvailableOffline) {
      const { podcastsDownloaded } = yield select(
        state => state.localPodcastsManager,
      );

      const isPodcastAlreadyDownloaded = podcastsDownloaded.some(
        podcastDownloaded => podcastDownloaded.id === podcast.id,
      );

      if (!isPodcastAlreadyDownloaded) {
        playlistUpdated = {
          ...playlistUpdated,
          downloads: [podcast.id, ...playlistUpdated.downloads],
        };

        yield call(downloadPodcast, podcast);
      }
    }

    const podcastsUpdated = [podcast, ...playlist.podcasts];

    const playlistsUpdated = yield call(
      _handlePersistsPlaylistsUpdated,
      playlistUpdated,
      podcastsUpdated,
    );

    yield put(PlaylistCreators.addPodcastSuccess(playlistsUpdated));
  } catch (err) {
    yield put(
      PlaylistCreators.createPlaylistFailure(
        'An unexpected error happened while try to add podcast on playlist. Sorry for that.',
      ),
    );
  }
}

export function* removePodcast({ payload }) {
  try {
    const { playlists } = yield select(state => state.playlist);
    const { playlist, podcastIndex } = payload;

    if (playlist.isAvailableOffline) {
      const podcast = playlist.podcasts[podcastIndex];
      const isPodcastDownloadedByPlaylist = playlist.downloads.some(
        podcastId => podcastId === podcast.id,
      );

      if (isPodcastDownloadedByPlaylist) {
        yield call(removePodcastFromLocalStorage, {
          payload: {
            podcast: {
              id: podcast.id,
            },
          },
        });
      }
    }

    const podcastsUpdated = playlist.podcasts.filter(
      (podcastInPlaylist, index) => index !== podcastIndex,
    );

    const playlistsUpdated = yield call(
      _handlePersistsPlaylistsUpdated,
      playlist,
      podcastsUpdated,
    );

    yield put(
      PlaylistCreators.removePodcastSuccess(playlistsUpdated, {
        ...playlist,
        podcasts: podcastsUpdated,
      }),
    );
  } catch (err) {
    console.log(err);
    yield put(PlaylistCreators.removePodcastFailure());
  }
}

export function* getPlaylist({ payload }) {
  try {
    const { title } = payload;
    const { localPodcastsManager, playlist } = yield select(state => state);

    const { podcastsDownloaded } = localPodcastsManager;
    const { playlists } = playlist;

    const playlistSelected = playlists.find(
      playlistInStore => playlistInStore.title === title,
    );

    const podcasts = playlistSelected.podcasts.map(podcast => ({
      ...podcast,
      isDownloaded: podcastsDownloaded.some(
        podcastDownloaded => podcastDownloaded.id === podcast.id,
      ),
    }));

    yield put(
      PlaylistCreators.getPlaylistSuccess({
        ...playlistSelected,
        podcasts,
      }),
    );
  } catch (err) {
    yield put(PlaylistCreators.getPlaylistFailure());
  }
}

function* _setToAvailableOffline(playlistSelected) {
  try {
    const { localPodcastsManager, playlist } = yield select(state => state);

    const { podcastsDownloaded } = localPodcastsManager;
    const podcastsDownloadedByPlaylist = [];

    const podcastsToDownload = playlistSelected.podcasts.filter((podcast) => {
      const isPodcastAlreadyDownloaded = podcastsDownloaded.some(
        podcastDownloaded => podcastDownloaded.id === podcast.id,
      );

      return !isPodcastAlreadyDownloaded;
    });

    const playlistUpdated = {
      ...playlistSelected,
      isAvailableOffline: true,
      downloads: podcastsToDownload.map(podcast => podcast.id),
    };

    yield call(
      _handlePersistsPlaylistsUpdated,
      playlistUpdated,
      playlistSelected.podcasts,
    );

    const playlistsUpdated = playlist.playlists.map(playlist => (playlist.title === playlistUpdated.title
      ? playlistUpdated
      : playlistFromStore));

    yield put(
      PlaylistCreators.setOfflineAvailabilitySuccess(
        playlistUpdated,
        playlistsUpdated,
      ),
    );

    yield all(
      podcastsToDownload.map(podcast => call(downloadPodcast, podcast)),
    );
  } catch (err) {
    throw err;
  }
}

function* _setToUnvailableOffline(playlistSelected) {
  try {
    const { localPodcastsManager, playlist } = yield select(state => state);
    const { podcastsDownloaded, downloadingList } = localPodcastsManager;

    const jobsToCancel = downloadingList.filter((downloadingItem) => {
      const shouldCancelPodcatDownload = playlistSelected.downloads.some(
        podcastId => downloadingItem.id === podcastId,
      );
      return shouldCancelPodcatDownload;
    });

    const podcastsAlreadyDownloadedByPlaylistSelected = playlistSelected.downloads.filter(
      (podcast) => {
        const isPodcastAlreadyDownloaded = podcastsDownloaded.some(
          podcastDownloaded => podcastsDownloaded.id === podcast.id,
        );
        return isPodcastAlreadyDownloaded;
      },
    );

    console.tron.log(
      'podcastsAlreadyDownloadedByPlaylistSelected',
      podcastsAlreadyDownloadedByPlaylistSelected,
    );
    yield all(
      podcastsAlreadyDownloadedByPlaylistSelected.map(id => call(removePodcastFromLocalStorage, {
        payload: {
          podcast: {
            id,
          },
        },
      })),
    );

    yield all(jobsToCancel.map(jobInfo => call(stopPodcastDownload, jobInfo)));

    const playlistUpdated = {
      ...playlistSelected,
      isAvailableOffline: false,
      downloads: [],
    };

    yield call(
      _handlePersistsPlaylistsUpdated,
      playlistUpdated,
      playlistSelected.podcasts,
    );

    const playlistsUpdated = playlist.playlists.map(playlist => (playlist.title === playlistUpdated.title
      ? playlistUpdated
      : playlistFromStore));

    yield put(
      PlaylistCreators.setOfflineAvailabilitySuccess(
        playlistUpdated,
        playlistsUpdated,
      ),
    );
  } catch (err) {
    throw err;
  }
}

export function* setOfflineAvailability({ payload }) {
  try {
    const { playlist, available } = payload;

    if (available) {
      yield call(_setToAvailableOffline, playlist);
    }

    if (!available) {
      yield call(_setToUnvailableOffline, playlist);
    }
  } catch (err) {
    console.log(err);
    yield put(PlaylistCreators.setOfflineAvailabilityError());
  }
}
