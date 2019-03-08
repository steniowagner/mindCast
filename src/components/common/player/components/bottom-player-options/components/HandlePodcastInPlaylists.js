// @flow

import React from 'react';

import Icon from '~/components/common/Icon';
import Button from './Button';

type Props = {
  onToggleAddPodcastToPlaylistModal: Function,
  iconSize: number,
};

const HandlePodcastInPlaylists = ({
  onToggleAddPodcastToPlaylistModal,
  iconSize,
}: Props): Object => (
  <Button
    onPress={onToggleAddPodcastToPlaylistModal}
  >
    <Icon
      name="playlist-plus"
      size={iconSize + 5}
    />
  </Button>
);

export default HandlePodcastInPlaylists;
