// @flow

import React from 'react';

import Icon from '~/components/common/Icon';
import Button from './Button';
import appStyles from '~/styles';

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
      color={appStyles.colors.white}
      name="playlist-plus"
      size={iconSize + 5}
    />
  </Button>
);

export default HandlePodcastInPlaylists;
