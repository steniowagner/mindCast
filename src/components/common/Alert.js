// @flow

import { Alert } from 'react-native';

export const TYPES = {
  REMOVE_DOWNLOADED_PODCAST_BY_PLAYLIST:
    'REMOVE_DOWNLOADED_PODCAST_BY_PLAYLIST',
  ADD_UNDOWNLOADED_PODCAST_PLAYLIST_AVAILABLE_OFFLINE:
    'ADD_UNDOWNLOADED_PODCAST_PLAYLIST_AVAILABLE_OFFLINE',
  REMOVE_PODCAST_FROM_PLAYLIST: 'REMOVE_PODCAST_FROM_PLAYLIST',
  ADD_REPEATED_PODCAS_PLAYLIST: 'ADD_REPEATED_PODCAS_PLAYLIST',
  REMOVE_DOWNLOADED_PODCAST: 'REMOVE_DOWNLOADED_PODCAST',
  DOWNLOAD_PODCAST: 'DOWNLOAD_PODCAST',
  REMOVE_PLAYLIST: 'REMOVE_PLAYLIST',
};

const configs = {
  [TYPES.REMOVE_DOWNLOADED_PODCAST_BY_PLAYLIST]: {
    title: 'Remove Downloaded Podcast',
    description:
      "This Podcast belongs to some of your Playlists that are available offline. If you remove the download of this podcast, it won't be available offline anymore on these playlists.",
    positiveText: 'Ok',
  },

  [TYPES.REMOVE_DOWNLOADED_PODCAST]: {
    title: 'Remove Downloaded Podcast',
    description:
      'Are you sure to remove this Podcast permanently from your device?',
    positiveText: 'Yes',
  },

  [TYPES.DOWNLOAD_PODCAST]: {
    title: 'Download Podcast',
    description:
      'Are you sure you want to Download this podcast? It can take a while.',
    positiveText: 'Yes',
  },

  [TYPES.REMOVE_PODCAST_FROM_PLAYLIST]: {
    title: 'Remove Podcast',
    description:
      'Are you sure you want to remove this Podcast from this Playlist?',
    positiveText: 'Yes',
  },

  [TYPES.ADD_REPEATED_PODCAS_PLAYLIST]: {
    title: 'Duplicated Podcast',
    description:
      'This Podcast has already been added to this Playlist. Do you want add it again?',
    positiveText: 'Yes',
  },

  [TYPES.ADD_UNDOWNLOADED_PODCAST_PLAYLIST_AVAILABLE_OFFLINE]: {
    title: 'Availability Offline',
    description:
      'This Playlist is Available Offline. When you add this podcast to this playlist, it will be downloaded automatically.',
    positiveText: 'OK',
  },

  [TYPES.REMOVE_PLAYLIST]: {
    title: 'Remove Playlist',
    description: 'Are you sure you want to remove this Playlist?',
    positiveText: 'Yes',
  },
};

export const CustomAlert = (type: string, action: Function): void => {
  const { title, description, positiveText } = configs[type];

  Alert.alert(
    title,
    description,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: positiveText, onPress: () => action() },
    ],
    { cancelable: false },
  );
};
