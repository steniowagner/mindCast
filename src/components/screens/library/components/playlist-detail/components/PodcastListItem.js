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
  background-color: ${({ theme }) => theme.colors.dark};
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

// const renderStatusIcon = (isPodcastDownloaded, isDownloading): Object => {
//   if (isDownloading) {
//     return (
//       <ActivityIndicator
//         color={appStyles.colors.primaryColor}
//         size="small"
//       />
//     );
//   }

//   return (
//     <Icon
//       size={22}
//       name={isPodcastDownloaded ? 'cloud-check' : 'cloud-download-outline'}
//       color={
//         isPodcastDownloaded
//           ? appStyles.colors.primaryColor
//           : appStyles.colors.white
//       }
//     />
//   );
// };

const PodcastListItem = ({
  onRemovePodcastFromPlaylist,
  onPressPodcastsListItem,
  isDownloading,
  podcast,
  index,
}: Props): Object => (
  <Wrapper>
    <Swipeout
      backgroundColor={appStyles.colors.dark}
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
