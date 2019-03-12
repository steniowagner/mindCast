// @flow

import { Alert } from 'react-native';

export const TYPES = {
  REMOVE_DOWNLOADED_PODCAST: 'REMOVE_DOWNLOADED_PODCAST',
  DOWNLOAD_PODCAST: 'DOWNLOAD_PODCAST',
};

const configs = {
  [TYPES.REMOVE_DOWNLOADED_PODCAST]: {
    title: 'Remove Downloaded Podcast',
    description: 'Are you sure to remove this Podcast permanently?',
  },

  [TYPES.DOWNLOAD_PODCAST]: {
    title: 'Download Podcast',
    description: 'Download this podcast?',
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
