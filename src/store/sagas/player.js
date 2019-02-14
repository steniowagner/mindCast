import { call, select, put } from 'redux-saga/effects';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';

import {
  persistItemInStorage,
  getItemFromStorage,
  KEYS,
} from '~/utils/AsyncStorageManager';
import {
  requestPermission,
  PERMISSIONS_TYPES,
} from '~/utils/AndroidPermissionsManager';

import { Creators as PlayerCreators } from '../ducks/player';

const FILE_PREFIX = Platform.OS === 'android' ? 'file://' : '';

const _isPodcastAlreadyCached = async (currentPodcast) => {
  const rawPodcastsSaved = await getItemFromStorage(KEYS.PODCAST, []);

  const podcastsSaved = typeof rawPodcastsSaved === 'string'
    ? JSON.parse(rawPodcastsSaved)
    : rawPodcastsSaved;

  const podcastCached = podcastsSaved.filter(
    podcast => podcast.id === currentPodcast.id,
  )[0];

  return podcastCached;
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
          originalPlaylistIndex,
          originalPlaylist,
        }),
      );
    }

    const currentPlaylist = originalPlaylist.filter(
      podcast => podcast.id !== currentPodcast.id,
    );

    let currentIndex = currentPlaylist.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = currentPlaylist[currentIndex];
      currentPlaylist[currentIndex] = currentPlaylist[randomIndex];
      currentPlaylist[randomIndex] = temporaryValue;
    }

    currentPlaylist.unshift(currentPodcast);

    const currentPodcastIndexOnOriginalPlaylist = originalPlaylist.findIndex(
      podcast => podcast.id === currentPodcast.id,
    );

    yield put(
      PlayerCreators.shufflePlaylistSuccess({
        originalPlaylistIndex: currentPodcastIndexOnOriginalPlaylist,
        originalPlaylist,
        playlist: currentPlaylist,
        playlistIndex: 0,
      }),
    );
  } catch (err) {
    // console.tron.log(err);
  }
}

export function* setPodcast() {
  try {
    const { playlistIndex, playlist } = yield select(state => state.player);
    const currentPodcast = playlist[playlistIndex];

    yield requestPermission(PERMISSIONS_TYPES.READ_EXTERNAL_STORAGE);

    /* yield persistItemInStorage(
      KEYS.PODCAST,
      JSON.stringify([
        {
          ...currentPodcast,
          path: `${FILE_PREFIX}${RNFS.ExternalDirectoryPath}/${
            currentPodcast.id
          }.mp3`,
        },
      ]),
    );

    yield call(RNFS.downloadFile, {
      fromUrl: 'https://s3-sa-east-1.amazonaws.com/gonative/1.mp3',
      toFile: `${FILE_PREFIX}${RNFS.ExternalDirectoryPath}/${
        currentPodcast.id
      }.mp3`,
      discretionary: true,
    }); */

    const podcastCached = yield _isPodcastAlreadyCached(currentPodcast);

    const isPodcastAlreadyCached = !!podcastCached
      && !!podcastCached.path
      && typeof podcastCached.path === 'string';

    const podcastURI = isPodcastAlreadyCached
      ? podcastCached.path
      : currentPodcast.url;

    yield put(PlayerCreators.setPodcastSuccess(podcastURI));
  } catch (err) {}
}
