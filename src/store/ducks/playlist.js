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
  REMOVE_PODCAST_REQUEST: 'playlist/REMOVE_PODCAST_REQUEST',
  REMOVE_PODCAST_SUCCESS: 'playlist/REMOVE_PODCAST_SUCCESS',
  REMOVE_PODCAST_ERROR: 'playlist/REMOVE_PODCAST_ERROR',
  GET_PLAYLIST_REQUEST: 'playlist/GET_PLAYLIST_REQUEST',
  GET_PLAYLIST_SUCCESS: 'playlist/GET_PLAYLIST_SUCCESS',
  GET_PLAYLIST_ERROR: 'playlist/GET_PLAYLIST_ERROR',
  SET_AVAILABLE_OFFLINE_REQUEST: 'playlist/SET_AVAILABLE_OFFLINE_REQUEST',
  SET_AVAILABLE_OFFLINE_SUCCESS: 'playlist/SET_AVAILABLE_OFFLINE_SUCCESS',
  SET_AVAILABLE_OFFLINE_ERROR: 'playlist/SET_AVAILABLE_OFFLINE_ERROR',
  REMOVE_PLAYLIST_REQUEST: 'playlist/REMOVE_PLAYLIST_REQUEST',
  REMOVE_PLAYLIST_SUCCESS: 'playlist/REMOVE_PLAYLIST_SUCCESS',
  REMOVE_PLAYLIST_ERROR: 'playlist/REMOVE_PLAYLIST_ERROR',
  EDIT_PLAYLIST_REQUEST: 'playlist/EDIT_PLAYLIST_REQUEST',
  EDIT_PLAYLIST_SUCCESS: 'playlist/EDIT_PLAYLIST_SUCCESS',
  EDIT_PLAYLIST_ERROR: 'playlist/EDIT_PLAYLIST_ERROR',
};

const INITIAL_STATE = {
  playlists: [],
  playlist: {
    isAvailableOffline: false,
    downloads: [],
    podcasts: [],
    title: '',
  },
  error: false,
};

export const Creators = {
  createPlaylist: title => ({
    type: Types.CREATE_PLAYLIST_REQUEST,
    payload: { title },
  }),

  createPlaylistSuccess: playlists => ({
    type: Types.CREATE_PLAYLIST_SUCCESS,
    payload: { playlists },
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

  removePodcast: (playlist, podcastIndex) => ({
    type: Types.REMOVE_PODCAST_REQUEST,
    payload: { playlist, podcastIndex },
  }),

  removePodcastSuccess: (playlists, playlistUpdated) => ({
    type: Types.REMOVE_PODCAST_SUCCESS,
    payload: { playlists, playlistUpdated },
  }),

  removePodcastFailure: () => ({
    type: Types.REMOVE_PODCAST_ERROR,
  }),

  getPlaylist: title => ({
    type: Types.GET_PLAYLIST_REQUEST,
    payload: { title },
  }),

  getPlaylistSuccess: playlist => ({
    type: Types.GET_PLAYLIST_SUCCESS,
    payload: { playlist },
  }),

  getPlaylistFailure: title => ({
    type: Types.GET_PLAYLIST_ERROR,
  }),

  setOfflineAvailability: (playlist, available) => ({
    type: Types.SET_AVAILABLE_OFFLINE_REQUEST,
    payload: { playlist, available },
  }),

  setOfflineAvailabilitySuccess: (playlistUpdated, playlistsUpdated) => ({
    type: Types.SET_AVAILABLE_OFFLINE_SUCCESS,
    payload: { playlistUpdated, playlistsUpdated },
  }),

  setOfflineAvailabilityError: () => ({
    type: Types.SET_AVAILABLE_OFFLINE_ERROR,
  }),

  removePlaylist: playlistToRemove => ({
    type: Types.REMOVE_PLAYLIST_REQUEST,
    payload: { playlistToRemove },
  }),

  removePlaylistSuccess: playlists => ({
    type: Types.REMOVE_PLAYLIST_SUCCESS,
    payload: { playlists },
  }),

  removePlaylistFailure: () => ({
    type: Types.REMOVE_PLAYLIST_ERROR,
  }),

  editPlaylist: (playlistTitle, index) => ({
    type: Types.EDIT_PLAYLIST_REQUEST,
    payload: { playlistTitle, index },
  }),

  editPlaylistSuccess: playlists => ({
    type: Types.EDIT_PLAYLIST_SUCCESS,
    payload: { playlists },
  }),

  editPlaylistFailure: () => ({
    type: Types.EDIT_PLAYLIST_ERROR,
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
        playlists: payload.playlists,
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

    case Types.REMOVE_PODCAST_REQUEST:
      return {
        ...state,
        error: false,
      };

    case Types.REMOVE_PODCAST_SUCCESS:
      return {
        ...state,
        playlist: payload.playlistUpdated,
        playlists: payload.playlists,
      };

    case Types.REMOVE_PODCAST_ERROR:
      return {
        ...state,
        error: true,
      };

    case Types.REMOVE_PLAYLIST_REQUEST:
      return {
        ...state,
        error: false,
      };

    case Types.REMOVE_PLAYLIST_SUCCESS:
      return {
        ...state,
        playlists: payload.playlists,
      };

    case Types.REMOVE_PLAYLIST_ERROR:
      return {
        ...state,
        error: true,
      };

    case Types.EDIT_PLAYLIST_REQUEST:
      return {
        ...state,
        error: false,
      };

    case Types.EDIT_PLAYLIST_SUCCESS:
      return {
        ...state,
        playlists: payload.playlists,
      };

    case Types.EDIT_PLAYLIST_ERROR:
      return {
        ...state,
        error: true,
      };

    case Types.GET_PLAYLIST_REQUEST:
      return {
        ...state,
      };

    case Types.GET_PLAYLIST_SUCCESS:
      return {
        ...state,
        playlist: payload.playlist,
      };

    case Types.GET_PLAYLIST_ERROR:
      return {
        ...state,
      };

    case Types.SET_AVAILABLE_OFFLINE_REQUEST:
      return {
        ...state,
      };

    case Types.SET_AVAILABLE_OFFLINE_SUCCESS:
      return {
        ...state,
        playlists: payload.playlistsUpdated,
        playlist: payload.playlistUpdated,
      };

    case Types.SET_AVAILABLE_OFFLINE_ERROR:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default playlist;
