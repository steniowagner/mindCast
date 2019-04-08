// @flow

import React from 'react';

import Icon from '~/components/common/Icon';
import Button from './Button';
import appStyles from '~/styles';

type Props = {
  onToggleAddPlaylistModal: Function,
};

const AddPodcastPlaylist = ({ onToggleAddPlaylistModal }: Props): Object => (
  <Button
    onPress={onToggleAddPlaylistModal}
  >
    <Icon
      size={appStyles.metrics.getWidthFromDP('6%') + 5}
      color={appStyles.colors.white}
      name="playlist-plus"
    />
  </Button>
);

export default AddPodcastPlaylist;
