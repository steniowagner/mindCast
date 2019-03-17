// @flow

import React from 'react';
import { FlatList, Animated, View } from 'react-native';
import styled from 'styled-components';

import PodcastListItem from './PodcastListItem';
import Header from './Header';
import appStyles from '~/styles';

const HEADER_HEIGHT = appStyles.metrics.getHeightFromDP('50%');

const Container = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.dark};
`;

type Props = {
  onTogglePlaylistDownloadedSwitch: Function,
  onRemovePodcastFromPlaylist: Function,
  isPlaylistAvailableOffline: boolean,
  onPressPlayAllButton: Function,
  onPressShuffleButton: Function,
  downloadingList: Array<string>,
  podcastsImages: Array<string>,
  podcasts: Array<Object>,
  title: string,
};

const PlaylistDetailComponent = ({
  onTogglePlaylistDownloadedSwitch,
  onRemovePodcastFromPlaylist,
  isPlaylistAvailableOffline,
  onPressPlayAllButton,
  onPressShuffleButton,
  downloadingList,
  podcastsImages,
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
          onPress={() => onRemovePodcastFromPlaylist(index)}
          isPodcastDownloaded={item.isDownloaded}
          isLast={index === podcasts.length - 1}
          isDownloading={item.isDownloading}
          authorName={item.author.name}
          imageURL={item.imageURL}
          title={item.title}
        />
      )}
      keyExtractor={(item, index) => `${item.title}-${index}`}
      showsVerticalScrollIndicator={false}
      data={podcasts}
    />
  </Container>
);

export default PlaylistDetailComponent;
