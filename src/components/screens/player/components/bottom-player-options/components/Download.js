// @flow

import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styled from 'styled-components';

import Icon from '~/components/common/Icon';
import { CustomAlert, TYPES } from '~/components/common/alert';
import appStyles from '~/styles';

import Button from './Button';

const Wrapper = styled(View)`
  height: 100%;
  width: 28px;
  justify-content: center;
  align-items: center;
`;

const _onPressDownloadPodcastButton = (): void => {};

const _onPressRemoveDownloadPodcastButton = (): void => {};

const _checkCurrentPodcastStored = (
  currentPodcast: Object,
  podcastsDownloaded: Array<Object>,
): boolean => {
  const isCurrentPodcastStored = podcastsDownloaded.findIndex(
    podcastDownloaded => podcastDownloaded.id === currentPodcast.id,
  ) >= 0;

  return isCurrentPodcastStored;
};

const _getButtonConfig = (isCurrentPodcastStored: boolean): Object => {
  const buttonConfig = isCurrentPodcastStored
    ? {
      name: 'cloud-check',
      color: appStyles.colors.primaryColor,
      action: _onPressRemoveDownloadPodcastButton(),
    }
    : {
      name: 'cloud-download-outline',
      color: appStyles.colors.white,
      action: _onPressDownloadPodcastButton(),
    };

  return buttonConfig;
};

const renderAlert = (
  isCurrentPodcastStored: boolean,
  currentPodcast: Object,
  removePodcast: Function,
  downloadPodcast: Function,
): void => {
  const { action, type } = isCurrentPodcastStored
    ? {
      action: () => removePodcast(currentPodcast),
      type: TYPES.REMOVE_DOWNLOADED_PODCAST,
    }
    : {
      action: () => downloadPodcast(currentPodcast),
      type: TYPES.DOWNLOAD_PODCAST,
    };

  CustomAlert(type, action);
};

const renderButton = (
  podcastsDownloaded: Array<Object>,
  downloadPodcast: Function,
  removePodcast: Function,
  currentPodcast: Object,
): Object => {
  const isCurrentPodcastStored = _checkCurrentPodcastStored(
    currentPodcast,
    podcastsDownloaded,
  );

  const { name, color } = _getButtonConfig(isCurrentPodcastStored);

  return (
    <Button
      onPress={() => renderAlert(
        isCurrentPodcastStored,
        currentPodcast,
        removePodcast,
        downloadPodcast,
      )
      }
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

type LocalPodcastsManagerProps = {
  podcastsDownloaded: Array<Object>,
  downloadingList: Array<Object>,
};

type Props = {
  localPodcastsManager: LocalPodcastsManagerProps,
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
  localPodcastsManager,
  downloadPodcast,
  currentPodcast,
  removePodcast,
}: Props): Object => {
  const { podcastsDownloaded, downloadingList } = localPodcastsManager;

  const isCurrentPodcastBeenDownloaded = isDownloadingCurrentPodcast(
    currentPodcast,
    downloadingList,
  );

  return (
    <Wrapper>
      {isCurrentPodcastBeenDownloaded
        ? renderLoading()
        : renderButton(
          podcastsDownloaded,
          downloadPodcast,
          removePodcast,
          currentPodcast,
        )}
    </Wrapper>
  );
};

export default Download;
