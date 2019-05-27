export const Types = {
  UPDATE_PODCAST_URI: 'player/UPDATE_PODCAST_URI',
  SEEK_PROGRESS_TIMER_REQUEST: 'player/SEEK_PROGRESS_TIMER_REQUEST',
  SEEK_PROGRESS_TIMER_SUCCESS: 'player/SEEK_PROGRESS_TIMER_SUCCESS',
  SHUFFLE_PLAYLIST_REQUEST: 'player/SHUFFLE_PLAYLIST_REQUEST',
  SHUFFLE_PLAYLIST_SUCCESS: 'player/SHUFFLE_PLAYLIST_SUCCESS',
  PLAY_PREVIOUS_REQUEST: 'player/PLAY_PREVIOUS_REQUEST',
  PLAY_PREVIOUS_SUCCESS: 'player/PLAY_PREVIOUS_SUCCESS',
  SET_PODCAST_REQUEST: 'player/SET_PODCAST_REQUEST',
  SET_PODCAST_SUCCESS: 'player/SET_PODCAST_SUCCESS',
  PLAY_NEXT_REQUEST: 'player/PLAY_NEXT_REQUEST',
  PLAY_NEXT_SUCCESS: 'player/PLAY_NEXT_SUCCESS',
  SET_REPEAT_PLAYLIST: 'player/SET_REPEAT_PLAYLIST',
  SET_REPEAT_CURRENT: 'player/SET_REPEAT_CURRENT',
  REMOVE_FROM_PLAYLIST: 'player/REMOVE_FROM_PLAYLIST',
  SET_CURRENT_TIME: 'player/SET_CURRENT_TIME',
  RESTART_PLAYER: 'player/RESTART_PLAYER',
  DISABLE_REPETIION: 'player/DISABLE_REPETIION',
  SETUP_PLAYER: 'player/SETUP_PLAYER',
  SETUP_SHUFFLE_PLAYER_REQUEST: 'player/SETUP_SHUFFLE_PLAYER_REQUEST',
  SETUP_SHUFFLE_PLAYER_SUCCESS: 'player/SETUP_SHUFFLE_PLAYER_SUCCESS',
  SET_PODCASTS_RECENTLY_PLAYED: 'player/SET_PODCASTS_RECENTLY_PLAYED',
  REPEAT_CURRENT_PODCAST_REQUEST: 'REPEAT_CURRENT_PODCAST_REQUEST',
  REPEAT_CURRENT_PODCAST_SUCCESS: 'REPEAT_CURRENT_PODCAST_SUCCESS',
  PLAY: 'player/PLAY',
  STOP: 'player/STOP',
};

const INITIAL_STATE = {
  isCurrentPodcastDownloaded: false,
  shouldSeekProgressSlider: false,
  shouldShufflePlaylist: false,
  shouldRepeatPlaylist: false,
  shouldRepeatCurrent: false,
  originalPlaylistIndex: 0,
  currentPodcast: null,
  originalPlaylist: [],
  currentTime: '00:00',
  backupPlaylist: [],
  playlistIndex: 0,
  playlist: [],
  seekValue: 0,
  paused: true,
  stopPlayer: false,
};

export const Creators = {
  updatePodcastURI: uri => ({
    type: Types.UPDATE_PODCAST_URI,
    payload: { uri },
  }),

  seekProgressTimer: seekValue => ({
    type: Types.SEEK_PROGRESS_TIMER_REQUEST,
    payload: { seekValue },
  }),

  seekProgressTimerSuccess: seekValue => ({
    type: Types.SEEK_PROGRESS_TIMER_SUCCESS,
    payload: { seekValue },
  }),

  shufflePlaylist: () => ({
    type: Types.SHUFFLE_PLAYLIST_REQUEST,
  }),

  shufflePlaylistSuccess: payload => ({
    type: Types.SHUFFLE_PLAYLIST_SUCCESS,
    payload,
  }),

  playPrevious: () => ({
    type: Types.PLAY_PREVIOUS_REQUEST,
  }),

  playPreviousSuccess: payload => ({
    type: Types.PLAY_PREVIOUS_SUCCESS,
    payload,
  }),

  setPodcast: () => ({
    type: Types.SET_PODCAST_REQUEST,
  }),

  setPodcastSuccess: currentPodcast => ({
    type: Types.SET_PODCAST_SUCCESS,
    payload: { currentPodcast },
  }),

  playNext: () => ({
    type: Types.PLAY_NEXT_REQUEST,
  }),

  playNextSuccess: payload => ({
    type: Types.PLAY_NEXT_SUCCESS,
    payload,
  }),

  setRepeatPlaylist: () => ({
    type: Types.SET_REPEAT_PLAYLIST,
  }),

  setRepeatCurrent: () => ({
    type: Types.SET_REPEAT_CURRENT,
  }),

  removeFromPlaylist: id => ({
    type: Types.REMOVE_FROM_PLAYLIST,
    payload: { id },
  }),

  setCurrentTime: currentTime => ({
    type: Types.SET_CURRENT_TIME,
    payload: { currentTime },
  }),

  restartPlayer: (originalPlaylistIndex, currentPodcast) => ({
    type: Types.RESTART_PLAYER,
    payload: { originalPlaylistIndex, currentPodcast },
  }),

  disableRepetition: () => ({
    type: Types.DISABLE_REPETIION,
  }),

  setupPlayer: playlist => ({
    type: Types.SETUP_PLAYER,
    payload: { playlist },
  }),

  setupShufflePlayer: playlist => ({
    type: Types.SETUP_SHUFFLE_PLAYER_REQUEST,
    payload: { playlist },
  }),

  setupShufflePlayerSuccess: playlist => ({
    type: Types.SETUP_SHUFFLE_PLAYER_SUCCESS,
    payload: { playlist },
  }),

  repeatCurrentPodcast: () => ({
    type: Types.REPEAT_CURRENT_PODCAST_REQUEST,
  }),

  repeatCurrentPodcastSuccess: currentPodcast => ({
    type: Types.REPEAT_CURRENT_PODCAST_SUCCESS,
    payload: { currentPodcast },
  }),

  play: () => ({
    type: Types.PLAY,
  }),

  pause: () => ({
    type: Types.STOP,
  }),
};

const parseCurrentPodcastTime = (rawTime) => {
  const currentTime = Math.ceil(rawTime);

  const currentTimeInMinutes = Math.floor(currentTime / 60);
  const currentTimeInSeconds = currentTime % 60;

  let minutes = '00';
  let seconds = '00';

  if (currentTimeInMinutes > 9) {
    minutes = currentTimeInMinutes;
  }

  if (currentTimeInMinutes >= 1 && currentTimeInMinutes <= 9) {
    minutes = `0${currentTimeInMinutes}`;
  }

  if (currentTimeInSeconds > 9 && currentTimeInSeconds <= 59) {
    seconds = currentTimeInSeconds;
  }

  if (currentTimeInSeconds >= 1 && currentTimeInSeconds <= 9) {
    seconds = `0${currentTimeInSeconds}`;
  }

  if (currentTimeInSeconds === 60) {
    seconds = '00';
  }

  return `${minutes}:${seconds}`;
};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case Types.UPDATE_PODCAST_URI:
      return {
        ...state,
        originalPlaylist: Object.assign([...state.originalPlaylist], {
          [state.originalPlaylistIndex]: {
            ...state.currentPodcast,
            uri: payload.uri,
          },
        }),
        playlist: Object.assign([...state.playlist], {
          [state.playlistIndex]: {
            ...state.currentPodcast,
            uri: payload.uri,
          },
        }),
      };

    case Types.SEEK_PROGRESS_TIMER_REQUEST:
      return {
        ...state,
        shouldSeekProgressSlider: true,
        seekValue: payload.seekValue,
      };

    case Types.SEEK_PROGRESS_TIMER_SUCCESS:
      return {
        ...state,
        currentTime: parseCurrentPodcastTime(payload.seekValue),
        shouldSeekProgressSlider: false,
      };

    case Types.SHUFFLE_PLAYLIST_REQUEST:
      return {
        ...state,
      };

    case Types.SHUFFLE_PLAYLIST_SUCCESS:
      return {
        ...state,
        ...payload,
        shouldShufflePlaylist: !state.shouldShufflePlaylist,
        backupPlaylist: payload.playlist,
      };

    case Types.PLAY_PREVIOUS_REQUEST:
      return {
        ...state,
        paused: true,
      };

    case Types.PLAY_PREVIOUS_SUCCESS:
      return {
        ...state,
        ...payload,
        currentTime: '00:00',
        currentPodcast: {
          ...state.currentPodcast,
          uri: null,
        },
      };

    case Types.SET_PODCAST_SUCCESS:
      return {
        ...state,
        currentPodcast: payload.currentPodcast,
        currentTime: '00:00',
        paused: false,
        seekValue: 0,
      };

    case Types.PLAY_NEXT_REQUEST:
      return {
        ...state,
        currentTime: '00:00',
        paused: true,
      };

    case Types.PLAY_NEXT_SUCCESS:
      return {
        ...state,
        ...payload,
        shouldRepeatCurrent: false,
      };

    case Types.SET_REPEAT_PLAYLIST:
      return {
        ...state,
        shouldRepeatPlaylist: true,
        shouldRepeatCurrent: false,
      };

    case Types.SET_REPEAT_CURRENT:
      return {
        ...state,
        playlist: state.backupPlaylist,
        shouldRepeatPlaylist: false,
        shouldRepeatCurrent: true,
      };

    case Types.REMOVE_FROM_PLAYLIST:
      return {
        ...state,
        playlist: state.playlist.filter((podcast) => {
          const isRemovingCurrentPodcast = podcast.id === state.currentPodcast.id;
          const isLookingToOtherPodcast = podcast.id !== payload.id;

          return isLookingToOtherPodcast;
        }),
      };

    case Types.SET_CURRENT_TIME:
      return {
        ...state,
        currentTime: parseCurrentPodcastTime(payload.currentTime),
      };

    case Types.RESTART_PLAYER:
      return {
        ...state,
        originalPlaylistIndex: payload.originalPlaylistIndex,
        currentPodcast: payload.currentPodcast,
        playlist: state.backupPlaylist,
        stopPlayer: true,
      };

    case Types.DISABLE_REPETIION:
      return {
        ...state,
        shouldRepeatPlaylist: false,
        shouldRepeatCurrent: false,
      };

    case Types.SETUP_PLAYER:
      return {
        ...INITIAL_STATE,
        originalPlaylist: payload.playlist,
        backupPlaylist: payload.playlist,
        playlist: payload.playlist,
      };

    case Types.SETUP_SHUFFLE_PLAYER_REQUEST:
      return {
        ...INITIAL_STATE,
      };

    case Types.SETUP_SHUFFLE_PLAYER_SUCCESS:
      return {
        ...state,
        originalPlaylist: payload.playlist,
        backupPlaylist: payload.playlist,
        playlist: payload.playlist,
      };

    case Types.REPEAT_CURRENT_PODCAST_REQUEST:
      return {
        ...state,
        currentTime: '00:00',
        currentPodcast: {
          ...state.currentPodcast,
          uri: null,
        },
        paused: true,
        seekValue: 0,
      };

    case Types.REPEAT_CURRENT_PODCAST_SUCCESS:
      return {
        ...state,
        currentPodcast: payload.currentPodcast,
        paused: false,
      };

    case Types.PLAY:
      return {
        ...state,
        stopPlayer: false,
        paused: false,
      };

    case Types.STOP:
      return {
        ...state,
        paused: true,
      };

    default:
      return state;
  }
};

export default player;
