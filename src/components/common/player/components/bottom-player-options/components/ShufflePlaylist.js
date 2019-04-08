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
      size={appStyles.metrics.getWidthFromDP('6%')}
      color={
        shouldShufflePlaylist
          ? appStyles.colors.primaryColor
          : appStyles.colors.white
      }
      name="shuffle"
    />
  </Button>
);

export default ShufflePlaylist;
