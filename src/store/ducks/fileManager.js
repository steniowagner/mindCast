export const Types = {
  DOWNLOAD_FILE: 'fileManager/DOWNLOAD_FILE',
};

const INITIAL_STATE = {};

export const Creators = {
  downloadFile: podcast => ({
    type: Types.DOWNLOAD_FILE,
    payload: { podcast },
  }),
};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case Types.DOWNLOAD_FILE:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default player;
