export const Types = {
  CREATE_PLAYLIST_REQUEST: 'playlist/CREATE_PLAYLIST_REQUEST',
  CREATE_PLAYLIST_SUCCESS: 'playlist/CREATE_PLAYLIST_SUCCESS',
  CREATE_PLAYLIST_ERROR: 'playlist/CREATE_PLAYLIST_ERROR',
  LOAD_PLAYLISTS_REQUEST: 'playlist/LOAD_PLAYLISTS_REQUEST',
  LOAD_PLAYLISTS_SUCCESS: 'playlist/LOAD_PLAYLISTS_SUCCESS',
  LOAD_PLAYLISTS_ERROR: 'playlist/LOAD_PLAYLISTS_ERROR',
  ADD_PODCAST_REQUEST: 'playlist/ADD_PODCAST_REQUEST',
  ADD_PODCAST_SUCCESS: 'playlist/ADD_PODCAST_SUCCESS',
  ADD_PODCAST_ERROR: 'playlist/ADD_PODCAST_ERROR',
};

const INITIAL_STATE = {
  playlist: null,
  playlists: [],
  error: false,
};

export const Creators = {
  createPlaylist: title => ({
    type: Types.CREATE_PLAYLIST_REQUEST,
    payload: { title },
  }),

  createPlaylistSuccess: newPlaylist => ({
    type: Types.CREATE_PLAYLIST_SUCCESS,
    payload: { newPlaylist },
  }),

  createPlaylistFailure: () => ({
    type: Types.CREATE_PLAYLIST_ERROR,
  }),

  loadPlaylists: () => ({
    type: Types.LOAD_PLAYLISTS_REQUEST,
  }),

  loadPlaylistsSuccess: playlists => ({
    type: Types.LOAD_PLAYLISTS_SUCCESS,
    payload: { playlists },
  }),

  loadPlaylistsFailure: () => ({
    type: Types.LOAD_PLAYLISTS_ERROR,
  }),

  addPodcast: (playlist, podcast) => ({
    type: Types.ADD_PODCAST_REQUEST,
    payload: { playlist, podcast },
  }),

  addPodcastSuccess: playlists => ({
    type: Types.ADD_PODCAST_SUCCESS,
    payload: { playlists },
  }),

  addPodcastFailure: () => ({
    type: Types.ADD_PODCAST_ERROR,
  }),
};

const playlist = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case Types.CREATE_PLAYLIST_REQUEST:
      return {
        ...state,
        error: false,
      };

    case Types.CREATE_PLAYLIST_SUCCESS:
      return {
        ...state,
        playlists: [...state.playlists, payload.newPlaylist],
      };

    case Types.CREATE_PLAYLIST_ERROR:
      return {
        ...state,
        error: true,
      };

    case Types.LOAD_PLAYLISTS_REQUEST:
      return {
        ...state,
        error: false,
      };

    case Types.LOAD_PLAYLISTS_SUCCESS:
      return {
        ...state,
        playlists: payload.playlists,
      };

    case Types.LOAD_PLAYLISTS_ERROR:
      return {
        ...state,
        error: true,
      };

    case Types.ADD_PODCAST_REQUEST:
      return {
        ...state,
        error: false,
      };

    case Types.ADD_PODCAST_SUCCESS:
      return {
        ...state,
        playlists: payload.playlists,
      };

    case Types.ADD_PODCAST_ERROR:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};

export default playlist;
