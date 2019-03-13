// @flow

import React from 'react';

import Icon from '~/components/common/Icon';
import Button from './Button';

type Props = {
  onToggleAddPlaylistModal: Function,
  iconSize: number,
};

const HandlePodcastInPlaylists = ({
  onToggleAddPlaylistModal,
  iconSize,
}: Props): Object => (
  <Button
    onPress={onToggleAddPlaylistModal}
  >
    <Icon
      name="playlist-plus"
      size={iconSize + 5}
    />
  </Button>
);

export default HandlePodcastInPlaylists;
