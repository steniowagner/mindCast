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
    CONSTANTS.KEYS.PODCASTS_SAVED,
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
      yield persistItemInStorage(CONSTANTS.KEYS.PODCASTS_SAVED, [
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
        CONSTANTS.KEYS.PODCASTS_SAVED,
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

function* _handleDownloadPodcastResult(statusCode, path, podcast) {
  if (statusCode === 200) {
    const podcastWithLocalURI = {
      ...podcast,
      path,
    };

    yield _addPodcastToSavedPodcastsList(podcastWithLocalURI);

    yield put(
      LocalPodcastsManagerCreators.removeFromDownloadingList(
        podcastWithLocalURI.id,
      ),
    );
    yield put(
      LocalPodcastsManagerCreators.addToDownloadedList(podcastWithLocalURI),
    );

    return podcastWithLocalURI;
  }

  throw new Error('Something goes wrong when trying to Download the Podcast');
}

export function* downloadPodcast(podcast) {
  try {
    const { url, id } = podcast;

    const PATH_TO_FILE = `${RNFS.DocumentDirectoryPath}/${id}.mp3`;

    yield put(LocalPodcastsManagerCreators.addToDownloadingList(id));

    const { promise } = yield call(RNFS.downloadFile, {
      fromUrl: url,
      toFile: PATH_TO_FILE,
      discretionary: true,
    });

    const { statusCode } = yield promise;

    const podcastWithLocalURI = yield call(
      _handleDownloadPodcastResult,
      statusCode,
      PATH_TO_FILE,
      podcast,
    );

    return podcastWithLocalURI;
  } catch (err) {
    throw err;
  }
}

export function* downloadPodcastToLocalStorage({ payload }) {
  try {
    const { podcast } = payload;

    const { path } = yield call(downloadPodcast, podcast);

    yield put(PlayerCreators.updatePodcastURI(path));
  } catch (err) {
    console.tron.log(err);
  }
}

export function* removePodcastFromLocalStorage({ payload }) {
  try {
    const { podcast } = payload;
    const { uri, id } = podcast;

    let uriToRemove = uri;

    if (!uri) {
      uriToRemove = `${RNFS.DocumentDirectoryPath}/${id}.mp3`;
    }

    yield call(RNFS.unlink, uriToRemove);

    yield _removePodcastFromSavedPodcastList(id);

    yield put(LocalPodcastsManagerCreators.removeFromDownloadedList(id));
    yield put(PlayerCreators.updatePodcastURI(podcast.url));
  } catch (err) {
    console.tron.log('removePodcast - err');
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

      yield removeItemFromStorage(CONSTANTS.KEYS.PODCASTS_SAVED);

      yield put(
        LocalPodcastsManagerCreators.clearAllLocalPodcastsReferencesSuccess(),
      );
    }
  } catch (err) {
    console.log(err);
  }
}
