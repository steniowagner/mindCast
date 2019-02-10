export const Types = {
  PLAY_TRACK: 'player/PLAY_TRACK',
};

const INITIAL_STATE = {
  loading: false,
  error: false,
};

export const Creators = {
  playTrack: () => ({
    type: Types.PLAY_TRACK,
  }),
};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case Types.PLAY_TRACK:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default player;
