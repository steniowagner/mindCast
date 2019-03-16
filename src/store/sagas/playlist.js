import {
  call, select, delay, put,
} from 'redux-saga/effects';

import { Creators as PlaylistCreators } from '../ducks/playlist';

import {
  removeItemFromStorage,
  persistItemInStorage,
  getItemFromStorage,
} from '~/utils/AsyncStorageManager';
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
        dowloads: [],
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

function* _handleUpdatePlaylists(playlist, podcasts) {
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

    const podcastsUpdated = [...playlist.podcasts, podcast];

    const playlistsUpdated = yield _handleUpdatePlaylists(
      playlist,
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
    const { playlist, podcast } = payload;

    const podcastsUpdated = playlist.podcasts.filter(
      podcastInPlaylist => podcastInPlaylist.id !== podcast.id,
    );

    const playlistsUpdated = yield _handleUpdatePlaylists(
      playlist,
      podcastsUpdated,
    );

    yield put(PlaylistCreators.removePodcastSuccess(playlistsUpdated));
  } catch (err) {
    yield put(
      PlaylistCreators.createPlaylistFailure(
        'An unexpected error happened while try to add podcast on playlist. Sorry for that.',
      ),
    );
  }
}
