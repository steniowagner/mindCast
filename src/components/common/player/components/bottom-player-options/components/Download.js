// @flow

import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as LocalPodcastsManagerCreators } from '~/store/ducks/localPodcastsManager';

import { CustomAlert, TYPES } from '~/components/common/Alert';
import Icon from '~/components/common/Icon';
import appStyles from '~/styles';

import Button from './Button';

const Wrapper = styled(View)`
  height: 100%;
  width: ${({ theme }) => theme.metrics.getWidthFromDP('6%') + 8};
  justify-content: center;
  align-items: center;
`;

const checkCurrentPodcastStored = (
  currentPodcast: Object,
  podcastsDownloaded: Array<Object>,
): boolean => {
  const isCurrentPodcastStored = podcastsDownloaded.findIndex(
    podcastDownloaded => podcastDownloaded.id === currentPodcast.id,
  ) >= 0;

  return isCurrentPodcastStored;
};

const getButtonConfig = (isCurrentPodcastStored: boolean): Object => {
  const buttonConfig = isCurrentPodcastStored
    ? {
      name: 'cloud-check',
      color: appStyles.colors.primaryColor,
    }
    : {
      name: 'cloud-download-outline',
      color: appStyles.colors.white,
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
  const isCurrentPodcastStored = checkCurrentPodcastStored(
    currentPodcast,
    podcastsDownloaded,
  );

  const { name, color } = getButtonConfig(isCurrentPodcastStored);

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
        size={appStyles.metrics.getWidthFromDP('6%') + 4}
        color={color}
        name={name}
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

const isDownloadingCurrentPodcast = (
  currentPodcast: Object,
  downloading: Array<Object>,
): boolean => downloading.some(downloadingItem => downloadingItem.id === currentPodcast.id);

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

const mapDispatchToProps = dispatch => bindActionCreators(LocalPodcastsManagerCreators, dispatch);

const mapStateToProps = state => ({
  localPodcastsManager: state.localPodcastsManager,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Download);
