export const Types = {
  SHUFFLE_PLAYLIST_REQUEST: 'player/SHUFFLE_PLAYLIST_REQUEST',
  SHUFFLE_PLAYLIST_SUCCESS: 'player/SHUFFLE_PLAYLIST_SUCCESS',

  PLAY_NEXT_REQUEST_SUCCESS: 'player/PLAY_NEXT_REQUEST_SUCCESS',
  PLAY_NEXT_REQUEST: 'player/PLAY_NEXT_REQUEST',

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
    title: 'Borracha',
    author: '1',
    id: 1,
    url: 'https://s3-sa-east-1.amazonaws.com/mind-cast/borracha.mp3',
  },
  {
    title: 'Eu vou Cair',
    author: '2',
    id: 2,
    url: 'https://s3-sa-east-1.amazonaws.com/mind-cast/eu_vou_cair.mp3',
  },
  {
    title: 'Eu vou Cair Caralho',
    author: '3',
    id: 3,
    url: 'https://s3-sa-east-1.amazonaws.com/mind-cast/eu_vou_cair_caralho.mp3',
  },
];

const INITIAL_STATE = {
  shouldShufflePlaylist: false,
  shouldRepeatPlaylist: true,
  shouldRepeatSingle: false,
  currentPodcast: podcasts[0],
  currentTime: '00:00',
  originalPlaylist: podcasts,
  originalPlaylistIndex: 0,
  playlist: podcasts,
  playlistIndex: 0,
  paused: false,
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

  previousPodcast: () => ({
    type: Types.PREVIOUS_PODCAST,
  }),

  restartPlayer: (originalPlaylistIndex, currentPodcast) => ({
    type: Types.RESTART_PLAYER,
    payload: { originalPlaylistIndex, currentPodcast },
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

// PQ TÁ DESLIGANDO O ALEATÓRIO DEPOIS DE REORIDUZIR A PLAYLIST?

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
      };

    case Types.PLAY_NEXT_REQUEST_SUCCESS:
      return {
        ...state,
        ...payload,
        currentTime: '00:00',
        paused: true,
      };

    case Types.PREVIOUS_PODCAST:
      return {
        ...state,
      };

    case Types.RESTART_PLAYER:
      return {
        ...state,
        originalPlaylistIndex: payload.originalPlaylistIndex,
        currentPodcast: payload.currentPodcast,
        currentTime: '00:00',
        paused: true,
      };

    default:
      return state;
  }
};

export default player;
