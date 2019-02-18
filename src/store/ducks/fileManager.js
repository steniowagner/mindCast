export const Types = {
  DOWNLOAD_PODCAST: 'fileManager/DOWNLOAD_PODCAST',
};

export const Creators = {
  downloadPodcast: currentPodcast => ({
    type: Types.DOWNLOAD_PODCAST,
    payload: { currentPodcast },
  }),
};

const player = (_, { type }) => {
  switch (type) {
    case Types.DOWNLOAD_PODCAST:
      return null;

    default:
      return null;
  }
};

export default player;
