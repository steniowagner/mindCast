// @flow

import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Swipeout from 'react-native-swipeout';
import styled from 'styled-components';

import PodcastsDownloadedListItem from '~/components/common/PodcastItemLIst';
import SwipeOutButton from '~/components/common/SwipeOutButton';
import Loading from '~/components/common/Loading';
import Icon from '~/components/common/Icon';
import appStyles from '~/styles';

const Wrapper = styled(View)`
  width: 100%;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const SwipeDeleteButton = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primaryColor};
`;

type Props = {
  onRemovePodcastFromPlaylist: Function,
  onPressPodcastsListItem: Function,
  isDownloading: boolean,
  podcast: Object,
  index: number,
};

const PodcastListItem = ({
  onRemovePodcastFromPlaylist,
  onPressPodcastsListItem,
  isDownloading,
  podcast,
  index,
}: Props): Object => (
  <Wrapper>
    <Swipeout
      backgroundColor="transparent"
      autoClose
      right={[
        {
          component: (
            <SwipeOutButton
              color={appStyles.colors.primaryColor}
              icon="trash-can-outline"
            />
          ),
          onPress: onRemovePodcastFromPlaylist,
          type: 'delete',
        },
      ]}
    >
      <PodcastsDownloadedListItem
        onPressItem={onPressPodcastsListItem}
        isDownloading={isDownloading}
        shouldShowDownloadStatus
        podcast={podcast}
        index={index + 1}
      />
    </Swipeout>
  </Wrapper>
);

export default PodcastListItem;
