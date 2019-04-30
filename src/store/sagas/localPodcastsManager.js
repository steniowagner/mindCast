import RNFS from 'react-native-fs';
import {
  select, call, all, put,
} from 'redux-saga/effects';
import { SERVER_URL } from 'react-native-dotenv';

import {
  removeItemFromStorage,
  persistItemInStorage,
  getItemFromStorage,
} from '~/utils/AsyncStorageManager';
import CONSTANTS from '~/utils/CONSTANTS';

import { Creators as LocalPodcastsManagerCreators } from '../ducks/localPodcastsManager';
import { Creators as PlayerCreators } from '../ducks/player';

export function* loadPodcastsRecentlyPlayed() {
  try {
    const rawPodcastsRecentlyPlayed = yield call(
      getItemFromStorage,
      CONSTANTS.KEYS.PODCASTS_PLAYED_RECENTLY,
      [],
    );

    const podcastsRecentlyPlayed = typeof rawPodcastsRecentlyPlayed === 'string'
      ? JSON.parse(rawPodcastsRecentlyPlayed)
      : rawPodcastsRecentlyPlayed;

    yield put(
      LocalPodcastsManagerCreators.loadPodcastsRecentlyPlayedSuccess(
        podcastsRecentlyPlayed,
      ),
    );
  } catch (err) {
    yield call(
      persistItemInStorage,
      CONSTANTS.KEYS.PODCASTS_PLAYED_RECENTLY,
      [],
    );
  }
}

export function* addPodcastToRecentlyPlayedList({ payload }) {
  try {
    const { podcast } = payload;

    const { podcastsRecentlyPlayed } = yield select(
      state => state.localPodcastsManager,
    );

    const podcastsRecentlyPlayedWithourCurrentPodcast = podcastsRecentlyPlayed.filter(
      podcastRecentlyPlayed => podcastRecentlyPlayed.id !== podcast.id,
    );

    const podcastsRecentlyPlayedUpdated = [
      podcast,
      ...podcastsRecentlyPlayedWithourCurrentPodcast,
    ].slice(0, 20);

    yield all([
      call(
        persistItemInStorage,
        CONSTANTS.KEYS.PODCASTS_PLAYED_RECENTLY,
        podcastsRecentlyPlayedUpdated,
      ),
      put(
        LocalPodcastsManagerCreators.addPodcastToRecentlyPlayedListSuccess(
          podcastsRecentlyPlayedUpdated,
        ),
      ),
    ]);
  } catch (err) {
    throw err;
  }
}

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
    console.log(err);
  }
}

function* _removePersistedPodcasts(id) {
  try {
    const { podcastsDownloaded } = yield select(
      state => state.localPodcastsManager,
    );

    const podcastsSaved = podcastsDownloaded.filter(
      podcast => podcast.id !== id,
    );

    yield persistItemInStorage(CONSTANTS.KEYS.PODCASTS_SAVED, podcastsSaved);
  } catch (err) {
    console.log(err);
  }
}

function* _getPodcastsDownloadedFromFS(podcastsFromFS) {
  try {
    const directoryContent = yield call(
      RNFS.readDir,
      RNFS.DocumentDirectoryPath,
    );

    const directoryFiles = directoryContent.filter(directoryItem => directoryItem.isFile());

    const podcastsDownloaded = podcastsFromFS.filter((podcastFromFS) => {
      const podcastFilename = `${podcastFromFS.id}.mp3`;

      const isPodcastsStillDownloaded = directoryFiles.some(
        file => file.name === podcastFilename,
      );

      return isPodcastsStillDownloaded;
    });

    return podcastsDownloaded;
  } catch (err) {
    throw err;
  }
}

export function* setPodcastsDownloadedList() {
  try {
    const podcastsFromFS = yield _getPodcastsSaved();

    const podcastsDownloaded = yield call(
      _getPodcastsDownloadedFromFS,
      podcastsFromFS,
    );

    yield persistItemInStorage(
      CONSTANTS.KEYS.PODCASTS_SAVED,
      podcastsDownloaded,
    );

    yield put(
      LocalPodcastsManagerCreators.setPodcastsDownloadedListSuccess(
        podcastsDownloaded,
      ),
    );
  } catch (err) {
    console.log(err);
  }
}

function* _handleDownloadPodcastResult(statusCode, path, podcast) {
  if (statusCode === 206) {
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
    const { id } = podcast;

    const PATH_TO_FILE = `${RNFS.DocumentDirectoryPath}/${id}.mp3`;

    const { jobId, promise } = yield call(RNFS.downloadFile, {
      fromUrl: `${SERVER_URL}/podcasts/${id}/listen`,
      toFile: PATH_TO_FILE,
      discretionary: true,
    });

    yield put(
      LocalPodcastsManagerCreators.addToDownloadingList({
        jobId,
        id,
      }),
    );

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
    console.log(err);
  }
}

export function* stopPodcastDownload(downloadInfo) {
  try {
    const { jobId, id } = downloadInfo;

    yield call(RNFS.stopDownload, jobId);

    yield call(removePodcastFromLocalStorage, {
      payload: {
        podcast: {
          id,
        },
      },
    });

    yield put(LocalPodcastsManagerCreators.removeFromDownloadingList(id));
  } catch (err) {
    throw err;
  }
}

export function* removePodcastFromLocalStorage({ payload }) {
  try {
    const { podcast } = payload;
    const { id } = podcast;

    const uri = `${RNFS.DocumentDirectoryPath}/${id}.mp3`;

    const isPodcastFileExists = yield call(RNFS.exists, uri);

    if (isPodcastFileExists) {
      yield call(RNFS.unlink, uri);

      yield _removePersistedPodcasts(id);

      yield put(LocalPodcastsManagerCreators.removeFromDownloadedList(id));

      yield put(PlayerCreators.updatePodcastURI(podcast.url));
    }
  } catch (err) {
    console.log(err);
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
