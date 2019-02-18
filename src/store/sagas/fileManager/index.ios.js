import RNFS from 'react-native-fs';
import { call, put } from 'redux-saga/effects';

import {
  removeItemFromStorage,
  persistItemInStorage,
  getItemFromStorage,
} from '~/utils/AsyncStorageManager';
import CONSTANTS from '~/utils/CONSTANTS';

import { Creators as PlayerCreators } from '../../ducks/player';

const _checkPodcastAlreadySaved = (podcastsSaved, podcastSearched) => {
  const isPodcastAlreadySaved = podcastsSaved.findIndex(podcast => podcast.id === podcastSearched.id) >= 0;

  return isPodcastAlreadySaved;
};

const _insertPodcastOnSavedPodcastsList = async (podcast) => {
  const rawPodcastsSaved = await getItemFromStorage(
    CONSTANTS.PODCASTS_SAVED,
    [],
  );

  const podcastsSaved = typeof rawPodcastsSaved === 'string'
    ? JSON.parse(rawPodcastsSaved)
    : rawPodcastsSaved;

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

export function* downloadPodcast({ payload }) {
  try {
    // yield removeItemFromStorage(CONSTANTS.PODCASTS_SAVED);

    const { currentPodcast } = payload;
    const { url, id } = currentPodcast;

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
      yield put(PlayerCreators.updatePodcastWithLocalURI(podcastWithLocalURI));
    }
  } catch (err) {
    console.tron.log(err);
  }
}
