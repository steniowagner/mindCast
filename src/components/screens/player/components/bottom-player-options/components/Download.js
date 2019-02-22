// @flow

import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styled from 'styled-components';

import Icon from '~/components/common/Icon';
import appStyles from '~/styles';

import Button from './Button';

const Wrapper = styled(View)`
  height: 100%;
  width: 28px;
  justify-content: center;
  align-items: center;
`;

const renderButton = (
  isCurrentPodcastDownloaded: boolean,
  downloadPodcast: Function,
  removePodcast: Function,
  currentPodcast: Object,
): Object => {
  const { name, color } = isCurrentPodcastDownloaded
    ? { name: 'cloud-check', color: appStyles.colors.primaryColor }
    : { name: 'cloud-download-outline', color: appStyles.colors.white };

  return (
    <Button
      onPress={() => downloadPodcast(currentPodcast)}
    >
      <Icon
        color={color}
        name={name}
        size={22}
      />
    </Button>
  );
};

const renderLoading = (): Object => (
  <ActivityIndicator
    color={appStyles.colors.primaryColor}
    size="small"
  />
);

type Props = {
  isCurrentPodcastDownloaded: boolean,
  downloadingList: Array<number>,
  downloadPodcast: Function,
  removePodcast: Function,
  currentPodcast: Object,
};

const isDownloadingCurrentPodcast = (
  currentPodcast: Object,
  downloading: Array<number>,
): boolean => {
  const isCurrentPodcastBeenDownloaded = downloading.findIndex(id => id === currentPodcast.id) >= 0;

  return isCurrentPodcastBeenDownloaded;
};

const Download = ({
  isCurrentPodcastDownloaded,
  downloadPodcast,
  downloadingList,
  currentPodcast,
  removePodcast,
}: Props): Object => {
  const isCurrentPodcastBeenDownloaded = isDownloadingCurrentPodcast(
    currentPodcast,
    downloadingList,
  );

  return (
    <Wrapper>
      {isCurrentPodcastBeenDownloaded
        ? renderLoading()
        : renderButton(
          isCurrentPodcastDownloaded,
          downloadPodcast,
          removePodcast,
          currentPodcast,
        )}
    </Wrapper>
  );
};

export default Download;
