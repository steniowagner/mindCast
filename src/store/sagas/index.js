import { all, takeLatest } from 'redux-saga/effects';

import { Types as LocalPodcastsManagerCreators } from '../ducks/localPodcastsManager';
import { Types as SubjectTypes } from '../ducks/subject';
import { Types as PlayerTypes } from '../ducks/player';
import { Types as AuthorTypes } from '../ducks/author';

import {
  clearAllLocalPodcastsReferences,
  setPodcastsDownloadedList,
  downloadPodcast,
  removePodcast,
} from './localPodcastsManager';
import {
  shufflePlaylist, setPodcast, playNext, playPrevious,
} from './player';
import { searchAuthorByName, getAuthorById } from './author';
import { getSubjectDetail } from './subject';

export default function* rootSaga() {
  return yield all([
    takeLatest(
      LocalPodcastsManagerCreators.SET_PODCASTS_DOWNLOADED_LIST_REQUEST,
      setPodcastsDownloadedList,
    ),
    takeLatest(LocalPodcastsManagerCreators.DOWNLOAD_PODCAST, downloadPodcast),
    takeLatest(
      LocalPodcastsManagerCreators.CLEAR_LOCAL_PODCASTS_REFERENCES_REQUEST,
      clearAllLocalPodcastsReferences,
    ),
    takeLatest(LocalPodcastsManagerCreators.REMOVE_PODCAST, removePodcast),
    takeLatest(PlayerTypes.SET_PODCAST_REQUEST, setPodcast),
    takeLatest(PlayerTypes.PLAY_NEXT_REQUEST, playNext),
    takeLatest(PlayerTypes.PLAY_PREVIOUS_REQUEST, playPrevious),
    takeLatest(PlayerTypes.SHUFFLE_PLAYLIST_REQUEST, shufflePlaylist),
    takeLatest(AuthorTypes.SEARCH_AUTHOR_BY_NAME_REQUEST, searchAuthorByName),
    takeLatest(SubjectTypes.GET_SUBJECT_DETAIL_REQUEST, getSubjectDetail),
    takeLatest(AuthorTypes.GET_AUTHOR_BY_ID_REQUEST, getAuthorById),
  ]);
}
