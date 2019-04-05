// @flow

import React from 'react';
import { FlatList, Animated, View } from 'react-native';
import styled from 'styled-components';

import PodcastListItem from './PodcastListItem';
import Header from './Header';

import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

const HEADER_HEIGHT = appStyles.metrics.getHeightFromDP('50%');

const Container = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.secondaryColor};
`;

type Props = {
  onTogglePlaylistDownloadedSwitch: Function,
  onRemovePodcastFromPlaylist: Function,
  isPlaylistAvailableOffline: boolean,
  onPressPlayAllButton: Function,
  onPressShuffleButton: Function,
  podcastsImages: Array<string>,
  podcasts: Array<Object>,
  navigation: Object,
  title: string,
};

const PlaylistDetailComponent = ({
  onTogglePlaylistDownloadedSwitch,
  onRemovePodcastFromPlaylist,
  isPlaylistAvailableOffline,
  onPressPlayAllButton,
  onPressShuffleButton,
  podcastsImages,
  navigation,
  podcasts,
  title,
}: Props): Object => (
  <Container>
    <Header
      onTogglePlaylistDownloadedSwitch={onTogglePlaylistDownloadedSwitch}
      isPlaylistAvailableOffline={isPlaylistAvailableOffline}
      onPressPlayAllButton={onPressPlayAllButton}
      onPressShuffleButton={onPressShuffleButton}
      images={podcastsImages}
      title={title}
    />
    <FlatList
      renderItem={({ item, index }) => (
        <PodcastListItem
          onRemovePodcastFromPlaylist={() => onRemovePodcastFromPlaylist(index)}
          onPressPodcastsListItem={() => {
            navigation.navigate(CONSTANTS.ROUTES.PODCAST_DETAIL, {
              [CONSTANTS.KEYS.PODCAST_DETAIL_SHOULD_SHOW_AUTHOR_SECTION]: true,
              [CONSTANTS.PARAMS.PODCAST_DETAIL]: item,
            });
          }}
          isDownloading={item.isDownloading}
          podcast={item}
          index={index}
        />
      )}
      keyExtractor={(item, index) => `${item.title}-${index}`}
      showsVerticalScrollIndicator={false}
      data={podcasts}
    />
  </Container>
);

export default PlaylistDetailComponent;
