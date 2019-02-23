export const Types = {
  CLEAR_LOCAL_PODCASTS_REFERENCES_REQUEST:
    'localPodcastsManager/CLEAR_LOCAL_PODCASTS_REFERENCES_REQUEST',
  CLEAR_LOCAL_PODCASTS_REFERENCES_SUCCESS:
    'localPodcastsManager/CLEAR_LOCAL_PODCASTS_REFERENCES_SUCCESS',
  SET_PODCASTS_DOWNLOADED_LIST_SUCCESS:
    'localPodcastsManager/SET_PODCASTS_DOWNLOADED_LIST_SUCCESS',
  SET_PODCASTS_DOWNLOADED_LIST_REQUEST:
    'localPodcastsManager/SET_PODCASTS_DOWNLOADED_LIST_REQUEST',
  REMOVE_FROM_DOWNLOADED_LIST:
    'localPodcastsManager/REMOVE_FROM_DOWNLOADED_LIST',
  ADD_TO_DOWNLOADED_LIST: 'localPodcastsManager/ADD_TO_DOWNLOADED_LIST',
  ADD_TO_DOWNLOADING_LIST: 'localPodcastsManager/ADD_TO_DOWNLOADING_LIST',
  REMOVE_FROM_DOWNLOADING_LIST:
    'localPodcastsManager/REMOVE_FROM_DOWNLOADING_LIST',
  DOWNLOAD_PODCAST: 'localPodcastsManager/DOWNLOAD_PODCAST',
  REMOVE_PODCAST: 'localPodcastsManager/REMOVE_PODCAST',
};

const INITIAL_STATE = {
  podcastsDownloaded: [],
  downloadingList: [],
};

export const Creators = {
  clearAllLocalPodcastsReferences: () => ({
    type: Types.CLEAR_LOCAL_PODCASTS_REFERENCES_REQUEST,
  }),

  clearAllLocalPodcastsReferencesSuccess: () => ({
    type: Types.CLEAR_LOCAL_PODCASTS_REFERENCES_SUCCESS,
  }),

  setPodcastsDownloadedList: () => ({
    type: Types.SET_PODCASTS_DOWNLOADED_LIST_REQUEST,
  }),

  setPodcastsDownloadedListSuccess: podcastsDownloaded => ({
    type: Types.SET_PODCASTS_DOWNLOADED_LIST_SUCCESS,
    payload: { podcastsDownloaded },
  }),

  removeFromDownloadedList: id => ({
    type: Types.REMOVE_FROM_DOWNLOADED_LIST,
    payload: { id },
  }),

  addToDownloadedList: podcast => ({
    type: Types.ADD_TO_DOWNLOADED_LIST,
    payload: { podcast },
  }),

  removeFromDownloadingList: id => ({
    type: Types.REMOVE_FROM_DOWNLOADING_LIST,
    payload: { id },
  }),

  addToDownloadingList: id => ({
    type: Types.ADD_TO_DOWNLOADING_LIST,
    payload: { id },
  }),

  downloadPodcast: currentPodcast => ({
    type: Types.DOWNLOAD_PODCAST,
    payload: { currentPodcast },
  }),

  removePodcast: currentPodcast => ({
    type: Types.REMOVE_PODCAST,
    payload: { currentPodcast },
  }),
};

const localPodcastsManagerCreators = (
  state = INITIAL_STATE,
  { payload, type },
) => {
  switch (type) {
    case Types.SET_PODCASTS_DOWNLOADED_LIST_REQUEST:
      return {
        ...state,
      };

    case Types.SET_PODCASTS_DOWNLOADED_LIST_SUCCESS:
      return {
        ...state,
        podcastsDownloaded: payload.podcastsDownloaded,
      };

    case Types.REMOVE_FROM_DOWNLOADED_LIST:
      return {
        ...state,
        podcastsDownloaded: state.podcastsDownloaded.filter(
          podcastDownloaded => podcastDownloaded.id !== payload.id,
        ),
      };

    case Types.ADD_TO_DOWNLOADED_LIST:
      return {
        ...state,
        podcastsDownloaded: [payload.podcast, ...state.podcastsDownloaded],
      };

    case Types.REMOVE_FROM_DOWNLOADING_LIST:
      return {
        ...state,
        downloadingList: state.downloadingList.filter(id => id !== payload.id),
      };

    case Types.ADD_TO_DOWNLOADING_LIST:
      return {
        ...state,
        downloadingList: [payload.id, ...state.downloadingList],
      };

    case Types.DOWNLOAD_PODCAST:
      return {
        ...state,
      };

    case Types.REMOVE_PODCAST:
      return {
        ...state,
      };

    case Types.CLEAR_LOCAL_PODCASTS_REFERENCES_REQUEST:
      return {
        ...state,
      };

    case Types.CLEAR_LOCAL_PODCASTS_REFERENCES_SUCCESS:
      return {
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
};

export default localPodcastsManagerCreators;
