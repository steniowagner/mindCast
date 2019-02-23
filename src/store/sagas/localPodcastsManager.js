import RNFS from 'react-native-fs';
import { select, call, put } from 'redux-saga/effects';

import {
  removeItemFromStorage,
  persistItemInStorage,
  getItemFromStorage,
} from '~/utils/AsyncStorageManager';
import CONSTANTS from '~/utils/CONSTANTS';

import { Creators as LocalPodcastsManagerCreators } from '../ducks/localPodcastsManager';
import { Creators as PlayerCreators } from '../ducks/player';

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

function* _addPodcastToSavedPodcastsList(podcastToSave) {
  try {
    const { podcastsDownloaded } = yield select(
      state => state.localPodcastsManager,
    );

    const isPodcastSaved = podcastsDownloaded.findIndex(
      podcastSaved => podcastSaved.id === podcastToSave.id,
    ) >= 0;

    if (!isPodcastSaved) {
      yield persistItemInStorage(CONSTANTS.PODCASTS_SAVED, [
        ...podcastsDownloaded,
        podcastToSave,
      ]);
    }
  } catch (err) {
    console.tron.log(err);
  }
}

function* _removePodcastFromSavedPodcastList(id) {
  try {
    const { podcastsDownloaded } = yield select(
      state => state.localPodcastsManager,
    );

    const isPodcastSaved = podcastsDownloaded.findIndex(podcastSaved => podcastSaved.id === id) >= 0;

    if (isPodcastSaved) {
      const podcastsDownloadedFiltered = podcastsDownloaded.filter(
        podcast => podcast.id !== id,
      );

      yield persistItemInStorage(
        CONSTANTS.PODCASTS_SAVED,
        podcastsDownloadedFiltered,
      );
    }
  } catch (err) {
    console.tron.log(err);
  }
}

export function* setPodcastsDownloadedList() {
  try {
    const podcastsSaved = yield _getPodcastsSaved();

    yield put(
      LocalPodcastsManagerCreators.setPodcastsDownloadedListSuccess(
        podcastsSaved,
      ),
    );
  } catch (err) {
    console.tron.log(err);
  }
}

export function* downloadPodcast({ payload }) {
  try {
    const { currentPodcast } = payload;
    const { url, id } = currentPodcast;

    const PATH_TO_FILE = `${RNFS.DocumentDirectoryPath}/${id}.mp3`;

    yield put(LocalPodcastsManagerCreators.addToDownloadingList(id));

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

      yield _addPodcastToSavedPodcastsList(podcastWithLocalURI);

      yield put(PlayerCreators.updatePodcastURI(PATH_TO_FILE));
      yield put(LocalPodcastsManagerCreators.removeFromDownloadingList(id));
      yield put(
        LocalPodcastsManagerCreators.addToDownloadedList(podcastWithLocalURI),
      );
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

    yield put(LocalPodcastsManagerCreators.removeFromDownloadedList(id));
    yield put(PlayerCreators.updatePodcastURI(currentPodcast.url));
  } catch (err) {
    console.tron.log(err);
  }
}

export function* clearAllLocalPodcastsReferences() {
  try {
    const { podcastsDownloaded } = yield select(
      state => state.localPodcastsManager,
    );

    const hasPodcastsDownloaded = podcastsDownloaded.length > 0;

    if (hasPodcastsDownloaded) {
      const removeFiles = podcastsDownloaded.map(async (podcastDownloaded) => {
        const PATH_TO_FILE = `${RNFS.DocumentDirectoryPath}/${
          podcastDownloaded.id
        }.mp3`;

        return RNFS.unlink(PATH_TO_FILE);
      });

      yield removeFiles;

      yield removeItemFromStorage(CONSTANTS.PODCASTS_SAVED);

      yield put(
        LocalPodcastsManagerCreators.clearAllLocalPodcastsReferencesSuccess(),
      );
    }
  } catch (err) {
    console.log(err);
  }
}
