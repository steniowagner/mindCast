// @flow

import React from 'react';

import Icon from '~/components/common/Icon';
import appStyles from '~/styles';
import Button from './Button';

type Props = {
  shouldShufflePlaylist: boolean,
  shufflePlaylist: Function,
  iconSize: number,
};

const ShufflePlaylist = ({
  shouldShufflePlaylist,
  shufflePlaylist,
  iconSize,
}: Props): Object => (
  <Button
    onPress={shufflePlaylist}
  >
    <Icon
      color={
        shouldShufflePlaylist
          ? appStyles.colors.primaryColor
          : appStyles.colors.white
      }
      name="shuffle"
      size={iconSize}
    />
  </Button>
);

export default ShufflePlaylist;
