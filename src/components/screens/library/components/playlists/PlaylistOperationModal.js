// @flow

import React from 'react';
import { AlertIOS, Platform } from 'react-native';
import styled from 'styled-components';

import AndroidOperationModal from './AndroidOperationModal';

const iOSModalAlert = (
  mainAction: Function,
  title: string,
  error,
  defaultText: string,
  toggleModal: Function,
  mode: string,
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
        text: mode.toUpperCase(),
        onPress: playlistTitle => mainAction(playlistTitle),
      },
    ],
    'plain-text',
    defaultText,
  );
};

type Props = {
  onTypePlaylistTitle: Function,
  toggleModal: Function,
  mainAction: Function,
  playlistTitle: string,
  hasError: boolean,
  mode: string,
};

const PlaylistOperationModal = ({
  onTypePlaylistTitle,
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
    return (
      <AndroidOperationModal
        onTypePlaylistTitle={onTypePlaylistTitle}
        playlistTitle={playlistTitle}
        toggleModal={toggleModal}
        mainAction={mainAction}
        error={error}
        mode={mode}
      />
    );
  }

  iOSModalAlert(mainAction, title, error, playlistTitle, toggleModal, mode);

  return null;
};

export default PlaylistOperationModal;
