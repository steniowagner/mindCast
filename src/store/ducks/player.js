export const Types = {
  SHUFFLE_PLAYLIST_REQUEST: 'player/SHUFFLE_PLAYLIST_REQUEST',
  SHUFFLE_PLAYLIST_SUCCESS: 'player/SHUFFLE_PLAYLIST_SUCCESS',

  PLAY_NEXT_REQUEST_SUCCESS: 'player/PLAY_NEXT_REQUEST_SUCCESS',
  PLAY_NEXT_REQUEST: 'player/PLAY_NEXT_REQUEST',

  PLAY_PREVIOUS_REQUEST_SUCCESS: 'player/PLAY_PREVIOUS_REQUEST_SUCCESS',
  PLAY_PREVIOUS_REQUEST: 'player/PLAY_PREVIOUS_REQUEST',

  SEEK_PROGRESS_TIMER_REQUEST: 'player/SEEK_PROGRESS_TIMER_REQUEST',
  SEEK_PROGRESS_TIMER: 'player/SEEK_PROGRESS_TIMER',

  SET_REPEAT_CURRENT: 'player/SET_REPEAT_CURRENT',

  RESTART_PLAYER: 'player/RESTART_PLAYER',

  SET_CURRENT_TIME_PODCAST: 'player/SET_CURRENT_TIME_PODCAST',
  PLAY_PODCAST: 'player/PLAY_PODCAST',
  STOP_PODCAST: 'player/STOP_PODCAST',
  PREVIOUS_PODCAST: 'player/PREVIOUS_PODCAST',
  SET_PODCAST: 'player/SET_PODCAST',
  SET_PODCAST_SUCCESS: 'player/SET_PODCAST_SUCCESS',
};

const podcasts = [
  {
    title: 'Valerie',
    author: 'Tomorrows Bad Seeds',
    id: 1,
    url: 'https://s3-sa-east-1.amazonaws.com/mind-cast/valerie.mp3',
    duration: '04:11',
    totalDurationInSeconds: 251,
  },
  {
    title: 'Till I Die (Ragnar Lothbrok)',
    author: 'Tech N9ne, 2Pac & Eminem',
    id: 2,
    url: 'https://s3-sa-east-1.amazonaws.com/mind-cast/till_i_die2.mp3',
    duration: '04:00',
    totalDurationInSeconds: 240,
  },
  {
    title: 'This Girl',
    author: 'Kungs vs Cookin’ on 3 Burners',
    id: 3,
    url: 'https://s3-sa-east-1.amazonaws.com/mind-cast/this_girl.mp3',
    duration: '03:17',
    totalDurationInSeconds: 197,
  },
  {
    title: 'Summit',
    author: 'Skrillex feat. Ellie Goulding',
    id: 4,
    url: 'https://s3-sa-east-1.amazonaws.com/mind-cast/summit.mp3',
    duration: '06:10',
    totalDurationInSeconds: 370,
  },
];

const INITIAL_STATE = {
  shouldSeekProgressSlider: false,
  shouldShufflePlaylist: false,
  shouldRepeatPlaylist: true,
  shouldRepeatCurrent: false,
  currentPodcast: podcasts[0],
  originalPlaylist: podcasts,
  originalPlaylistIndex: 0,
  currentTime: '00:00',
  playlist: podcasts,
  playlistIndex: 0,
  seekValue: -1,
  paused: true,
};

export const Creators = {
  shufflePlaylist: () => ({
    type: Types.SHUFFLE_PLAYLIST_REQUEST,
  }),

  shufflePlaylistSuccess: payload => ({
    type: Types.SHUFFLE_PLAYLIST_SUCCESS,
    payload,
  }),

  setPodcast: () => ({
    type: Types.SET_PODCAST,
  }),

  setPodcastSuccess: currentPodcast => ({
    type: Types.SET_PODCAST_SUCCESS,
    payload: { currentPodcast },
  }),

  setCurrentTime: currentTime => ({
    type: Types.SET_CURRENT_TIME_PODCAST,
    payload: { currentTime },
  }),

  playPodcast: () => ({
    type: Types.PLAY_PODCAST,
  }),

  pausePodcast: () => ({
    type: Types.STOP_PODCAST,
  }),

  playNext: () => ({
    type: Types.PLAY_NEXT_REQUEST,
  }),

  playNextSuccess: payload => ({
    type: Types.PLAY_NEXT_REQUEST_SUCCESS,
    payload,
  }),

  playPrevious: () => ({
    type: Types.PLAY_PREVIOUS_REQUEST,
  }),

  playPreviousSuccess: payload => ({
    type: Types.PLAY_PREVIOUS_REQUEST_SUCCESS,
    payload,
  }),

  restartPlayer: (originalPlaylistIndex, currentPodcast) => ({
    type: Types.RESTART_PLAYER,
    payload: { originalPlaylistIndex, currentPodcast },
  }),

  setRepeatCurrent: () => ({
    type: Types.SET_REPEAT_CURRENT,
  }),

  seekProgressTimerRequest: seekValue => ({
    type: Types.SEEK_PROGRESS_TIMER_REQUEST,
    payload: { seekValue },
  }),

  seekProgressTimerSuccess: seekValue => ({
    type: Types.SEEK_PROGRESS_TIMER,
    payload: { seekValue },
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

    case Types.SET_PODCAST:
      return {
        ...state,
      };

    case Types.SET_PODCAST_SUCCESS:
      return {
        ...state,
        currentPodcast: payload.currentPodcast,
        currentTime: '00:00',
        paused: false,
      };

    case Types.PLAY_PODCAST:
      return {
        ...state,
        paused: false,
      };

    case Types.STOP_PODCAST:
      return {
        ...state,
        paused: true,
      };

    case Types.SET_CURRENT_TIME_PODCAST:
      return {
        ...state,
        currentTime: parseCurrentPodcastTime(payload.currentTime),
      };

    case Types.PLAY_NEXT_REQUEST:
      return {
        ...state,
        currentTime: '00:00',
      };

    case Types.PLAY_NEXT_REQUEST_SUCCESS:
      return {
        ...state,
        ...payload,
        shouldRepeatCurrent: false,
        paused: true,
      };

    case Types.PLAY_PREVIOUS_REQUEST:
      return {
        ...state,
        paused: true,
      };

    case Types.PLAY_PREVIOUS_REQUEST_SUCCESS:
      return {
        ...state,
        ...payload,
        currentTime: '00:00',
        currentPodcast: {
          ...state.currentPodcast,
          uri: null,
        },
      };

    case Types.SET_REPEAT_CURRENT:
      return {
        ...state,
        shouldRepeatCurrent: !state.shouldRepeatCurrent,
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

    case Types.SEEK_PROGRESS_TIMER_REQUEST:
      return {
        ...state,
        shouldSeekProgressSlider: true,
        seekValue: payload.seekValue,
      };

    case Types.SEEK_PROGRESS_TIMER:
      return {
        ...state,
        currentTime: parseCurrentPodcastTime(payload.seekValue),
        shouldSeekProgressSlider: false,
      };

    default:
      return state;
  }
};

export default player;
