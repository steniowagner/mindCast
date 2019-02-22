import RNFS from 'react-native-fs';
import { call, put } from 'redux-saga/effects';

import {
  persistItemInStorage,
  getItemFromStorage,
} from '~/utils/AsyncStorageManager';
import CONSTANTS from '~/utils/CONSTANTS';

import { Creators as FileManagerCreators } from '../ducks/fileManager';
import { Creators as PlayerCreators } from '../ducks/player';

const _checkPodcastAlreadySaved = (podcastsSaved, podcastSearched) => {
  const isPodcastAlreadySaved = podcastsSaved.findIndex(podcast => podcast.id === podcastSearched.id) >= 0;

  return isPodcastAlreadySaved;
};

const _getPodcastsSaved = async () => {
  const rawPodcastsSaved = await getItemFromStorage(
    CONSTANTS.PODCASTS_SAVED,
    [],
  );

  const podcastsSaved = typeof rawPodcastsSaved === 'string'
    ? JSON.parse(rawPodcastsSaved)
    : rawPodcastsSaved;

  return podcastsSaved;
};

const _insertPodcastOnSavedPodcastsList = async (podcast) => {
  const podcastsSaved = await _getPodcastsSaved();

  const isPodcastAlreadySaved = _checkPodcastAlreadySaved(
    podcastsSaved,
    podcast,
  );

  if (!isPodcastAlreadySaved) {
    await persistItemInStorage(CONSTANTS.PODCASTS_SAVED, [
      ...podcastsSaved,
      podcast,
    ]);
  }
};

const _removePodcastFromSavedPodcastList = async (id) => {
  const podcastsSaved = await _getPodcastsSaved();

  const podcastsFiltered = podcastsSaved.filter(podcast => podcast.id !== id);

  await persistItemInStorage(CONSTANTS.PODCASTS_SAVED, podcastsFiltered);
};

export function* downloadPodcast({ payload }) {
  try {
    const { currentPodcast } = payload;
    const { url, id } = currentPodcast;

    yield put(FileManagerCreators.addToDownloadingList(id));

    const PATH_TO_FILE = `${RNFS.DocumentDirectoryPath}/${id}.mp3`;

    const { promise } = yield call(RNFS.downloadFile, {
      fromUrl: url,
      toFile: PATH_TO_FILE,
      discretionary: true,
    });

    const { statusCode } = yield promise;

    if (statusCode === 200) {
      const podcastWithLocalURI = {
        ...currentPodcast,
        path: PATH_TO_FILE,
      };

      yield _insertPodcastOnSavedPodcastsList(podcastWithLocalURI);
      yield put(PlayerCreators.updatePodcastURI(PATH_TO_FILE));
      yield put(FileManagerCreators.removeFromDownloadingList(id));
    }
  } catch (err) {
    console.tron.log(err);
  }
}

export function* removePodcast({ payload }) {
  try {
    const { currentPodcast } = payload;
    const { uri, id } = currentPodcast;

    yield call(RNFS.unlink, uri);

    yield _removePodcastFromSavedPodcastList(id);

    yield put(PlayerCreators.updatePodcastURI(currentPodcast.url));
  } catch (err) {
    console.tron.log(err);
  }
}
