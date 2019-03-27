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
  LOAD_PODCASTS_RECENTLY_PLAYED_REQUEST:
    'localPodcastsManager/LOAD_PODCASTS_RECENTLY_PLAYED_REQUEST',
  LOAD_PODCASTS_RECENTLY_PLAYED_SUCCESS:
    'localPodcastsManager/LOAD_PODCASTS_RECENTLY_PLAYED_SUCCESS',
  ADD_PODCAST_RECENTLY_PLAYED_REQUEST:
    'localPodcastsManager/ADD_PODCAST_RECENTLY_PLAYED_REQUEST',
  ADD_PODCAST_RECENTLY_PLAYED_SUCCESS:
    'localPodcastsManager/ADD_PODCAST_RECENTLY_PLAYED_SUCCESS',
};

const INITIAL_STATE = {
  podcastsRecentlyPlayed: [],
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

  addToDownloadingList: downloadInfo => ({
    type: Types.ADD_TO_DOWNLOADING_LIST,
    payload: { downloadInfo },
  }),

  downloadPodcast: podcast => ({
    type: Types.DOWNLOAD_PODCAST,
    payload: { podcast },
  }),

  removePodcast: podcast => ({
    type: Types.REMOVE_PODCAST,
    payload: { podcast },
  }),

  addPodcastToRecentlyPlayedList: podcast => ({
    type: Types.ADD_PODCAST_RECENTLY_PLAYED_REQUEST,
    payload: { podcast },
  }),

  addPodcastToRecentlyPlayedListSuccess: podcastsRecentlyPlayed => ({
    type: Types.ADD_PODCAST_RECENTLY_PLAYED_SUCCESS,
    payload: { podcastsRecentlyPlayed },
  }),

  loadPodcastsRecentlyPlayed: () => ({
    type: Types.LOAD_PODCASTS_RECENTLY_PLAYED_REQUEST,
  }),

  loadPodcastsRecentlyPlayedSuccess: podcastsRecentlyPlayed => ({
    type: Types.LOAD_PODCASTS_RECENTLY_PLAYED_SUCCESS,
    payload: { podcastsRecentlyPlayed },
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
        downloadingList: state.downloadingList.filter(
          downloadInfo => downloadInfo.id !== payload.id,
        ),
      };

    case Types.ADD_TO_DOWNLOADING_LIST:
      return {
        ...state,
        downloadingList: [...state.downloadingList, payload.downloadInfo],
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
        podcastsRecentlyPlayed: state.podcastsRecentlyPlayed,
      };

    case Types.LOAD_PODCASTS_RECENTLY_PLAYED_REQUEST:
      return {
        ...state,
      };

    case Types.LOAD_PODCASTS_RECENTLY_PLAYED_SUCCESS:
      return {
        ...state,
        podcastsRecentlyPlayed: payload.podcastsRecentlyPlayed,
      };

    case Types.ADD_PODCAST_RECENTLY_PLAYED_REQUEST:
      return {
        ...state,
      };

    case Types.ADD_PODCAST_RECENTLY_PLAYED_SUCCESS:
      return {
        ...state,
        podcastsRecentlyPlayed: payload.podcastsRecentlyPlayed,
      };

    default:
      return state;
  }
};

export default localPodcastsManagerCreators;
