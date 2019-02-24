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
  SET_CURRENT_TIME: 'player/SET_CURRENT_TIME',
  RESTART_PLAYER: 'player/RESTART_PLAYER',
  DISABLE_REPETIION: 'player/DISABLE_REPETIION',
  PLAY: 'player/PLAY',
  STOP: 'player/STOP',
};

const podcasts = [
  {
    title: 'Valerie',
    author: 'Tomorrows Bad Seeds',
    id: 1,
    url: 'https://s3-sa-east-1.amazonaws.com/mind-cast/valerie.mp3',
    thumbnailImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/universe-thumbnail.jpeg',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/universe.jpeg',
    duration: '04:11',
    totalDurationInSeconds: 251,
  },
  {
    title: 'Till I Die',
    author: 'Tech N9ne, 2Pac & Eminem',
    id: 2,
    url: 'https://s3-sa-east-1.amazonaws.com/mind-cast/till_i_die2.mp3',
    thumbnailImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/universe-thumbnail.jpeg',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/universe.jpeg',
    duration: '04:00',
    totalDurationInSeconds: 240,
  },
  {
    title: 'This Girl',
    author: 'Kungs vs Cookin’ on 3 Burners',
    id: 3,
    url: 'https://s3-sa-east-1.amazonaws.com/mind-cast/summit.mp3',
    thumbnailImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/universe-thumbnail.jpeg',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/universe.jpeg',
    duration: '03:17',
    totalDurationInSeconds: 197,
  },
];

const INITIAL_STATE = {
  isCurrentPodcastDownloaded: false,
  shouldSeekProgressSlider: false,
  shouldShufflePlaylist: false,
  shouldRepeatPlaylist: false,
  shouldRepeatCurrent: false,
  currentPodcast: podcasts[0],
  originalPlaylist: podcasts,
  originalPlaylistIndex: 0,
  currentTime: '00:00',
  playlist: podcasts,
  playlistIndex: 0,
  seekValue: 0,
  paused: true,
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

    case Types.SET_PODCAST_REQUEST:
      return {
        ...state,
        paused: true,
      };

    case Types.SET_PODCAST_SUCCESS:
      return {
        ...state,
        currentPodcast: payload.currentPodcast,
        currentTime: '00:00',
        paused: false,
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
        shouldRepeatPlaylist: false,
        shouldRepeatCurrent: true,
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
        shouldRepeatCurrent: false,
        playlistIndex: 0,
        paused: true,
      };

    case Types.DISABLE_REPETIION:
      return {
        ...state,
        shouldRepeatPlaylist: false,
        shouldRepeatCurrent: false,
      };

    case Types.PLAY:
      return {
        ...state,
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
