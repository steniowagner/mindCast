// @flow

import { Alert } from 'react-native';

export const TYPES = {
  ADD_UNDOWNLOADED_PODCAST_PLAYLIST_AVAILABLE_OFFLINE:
    'ADD_UNDOWNLOADED_PODCAST_PLAYLIST_AVAILABLE_OFFLINE',
  REMOVE_PODCAST_FROM_PLAYLIST: 'REMOVE_PODCAST_FROM_PLAYLIST',
  ADD_REPEATED_PODCAS_PLAYLIST: 'ADD_REPEATED_PODCAS_PLAYLIST',
  REMOVE_DOWNLOADED_PODCAST: 'REMOVE_DOWNLOADED_PODCAST',
  DOWNLOAD_PODCAST: 'DOWNLOAD_PODCAST',
};

const configs = {
  [TYPES.REMOVE_DOWNLOADED_PODCAST]: {
    title: 'Remove Downloaded Podcast',
    description:
      'Are you sure to remove this Podcast permanently from your device?',
  },

  [TYPES.DOWNLOAD_PODCAST]: {
    title: 'Download Podcast',
    description:
      'Are you sure you want to Download this podcast? It can take a while.',
  },

  [TYPES.REMOVE_PODCAST_FROM_PLAYLIST]: {
    title: 'Remove Podcast',
    description:
      'Are you sure you want to remove this Podcast from this Playlist?',
  },

  [TYPES.ADD_REPEATED_PODCAS_PLAYLIST]: {
    title: 'Duplicated Podcast',
    description:
      'This Podcast has already been added to this Playlist. Do you want add it again?',
  },

  [TYPES.ADD_UNDOWNLOADED_PODCAST_PLAYLIST_AVAILABLE_OFFLINE]: {
    title: 'Availability Offline',
    description:
      'This Playlist is Available Offline. When you add this podcast to this playlist, it will be downloaded automatically.',
  },
};

export const CustomAlert = (type: string, action: Function): void => {
  const { title, description } = configs[type];

  Alert.alert(
    title,
    description,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => action() },
    ],
    { cancelable: false },
  );
};
