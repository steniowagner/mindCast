// @flow

import React from 'react';

import Icon from '~/components/common/Icon';
import Button from './Button';

type Props = {
  onToggleAddPodcastToPlaylistModal: Function,
};

const HandlePodcastInPlaylists = ({
  onToggleAddPodcastToPlaylistModal,
}: Props): Object => (
  <Button
    onToggleAddPodcastToPlaylistModal={onToggleAddPodcastToPlaylistModal}
  >
    <Icon
      name="playlist-plus"
      size={24}
    />
  </Button>
);

export default HandlePodcastInPlaylists;
