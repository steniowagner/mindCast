// @flow

import React from 'react';
import {
  TouchableOpacity, AlertIOS, Platform, View, Text,
} from 'react-native';

const iOSModalAlert = (
  mainAction: Function,
  title: string,
  error,
  defaultText: string,
  toggleModal: Function,
): void => {
  AlertIOS.prompt(
    title,
    error,
    [
      {
        text: 'Cancel',
        onPress: toggleModal,
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: playlistTitle => mainAction(playlistTitle),
      },
    ],
    'plain-text',
    defaultText,
  );
};

const AndroidAlert = (): Object => (
  <View
    style={{
      width: 200,
      height: 200,
      backgroundColor: '#f0f',
    }}
  />
);

type Props = {
  toggleModal: Function,
  mainAction: Function,
  playlistTitle: string,
  hasError: boolean,
  mode: string,
};

const PlaylistOperationModal = ({
  playlistTitle,
  toggleModal,
  mainAction,
  hasError,
  mode,
}: Props): Object => {
  const title = `${mode} Playlist`;
  const error = hasError
    ? 'This title is already in use by other Playlist.'
    : '';

  if (Platform.OS === 'android') {
    return <AndroidAlert />;
  }

  iOSModalAlert(mainAction, title, error, playlistTitle, toggleModal);

  return null;
};

export default PlaylistOperationModal;
