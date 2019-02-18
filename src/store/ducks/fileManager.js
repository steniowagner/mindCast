export const Types = {
  DOWNLOAD_PODCAST: 'fileManager/DOWNLOAD_PODCAST',
  REMOVE_PODCAST: 'fileManager/REMOVE_PODCAST',
};

export const Creators = {
  downloadPodcast: currentPodcast => ({
    type: Types.DOWNLOAD_PODCAST,
    payload: { currentPodcast },
  }),

  removePodcast: currentPodcast => ({
    type: Types.REMOVE_PODCAST,
    payload: { currentPodcast },
  }),
};

const fileManager = (_, { type }) => {
  switch (type) {
    case Types.DOWNLOAD_PODCAST:
      return null;

    case Types.REMOVE_PODCAST:
      return null;

    default:
      return null;
  }
};

export default fileManager;
