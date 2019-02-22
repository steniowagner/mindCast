export const Types = {
  REMOVE_FROM_DOWNLOADING_LIST: 'fileManager/REMOVE_FROM_DOWNLOADING_LIST',
  ADD_TO_DOWNLOADING_LIST: 'fileManager/ADD_TO_DOWNLOADING_LIST',
  DOWNLOAD_PODCAST: 'fileManager/DOWNLOAD_PODCAST',
  REMOVE_PODCAST: 'fileManager/REMOVE_PODCAST',
};

const INITIAL_STATE = {
  downloadingList: [],
};

export const Creators = {
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

const fileManager = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case Types.REMOVE_FROM_DOWNLOADING_LIST:
      return {
        downloadingList: state.downloadingList.filter(id => id !== payload.id),
      };

    case Types.ADD_TO_DOWNLOADING_LIST:
      return {
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

    default:
      return state;
  }
};

export default fileManager;
