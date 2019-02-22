// @flow

import React from 'react';

import Icon from '~/components/common/Icon';
import appStyles from '~/styles';
import Button from './Button';

type Props = {
  shouldShufflePlaylist: boolean,
  shufflePlaylist: Function,
};

const ShufflePlaylist = ({
  shouldShufflePlaylist,
  shufflePlaylist,
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
      size={20}
    />
  </Button>
);

export default ShufflePlaylist;
