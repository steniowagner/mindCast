// @flow

import React from 'react';
import {
  TouchableOpacity,
  FlatList,
  Platform,
  Modal,
  View,
  Text,
} from 'react-native';
import styled from 'styled-components';

import PlaylistListItem from './PlaylistsListItem';
import Icon from '~/components/common/Icon';

const Container = styled(View)`
  width: 100%;
  height: 100%;
  padding-top: ${({ theme }) => (Platform.OS === 'android'
    ? theme.metrics.mediumSize
    : theme.metrics.extraLargeSize)}px;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.dark};
`;

const HeaderWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-vertical: ${({ theme }) => theme.metrics.extraLargeSize}px;
  margin-right: ${({ theme }) => theme.metrics.smallSize}px;
`;

const PlaylistText = styled(Text)`
  margin-left: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('7%')}px;
  font-family: CircularStd-Black;
`;

type Playlist = {
  podcastsDownloaded: Array<Object>,
  isAvailableOffline: boolean,
  podcasts: Array<Object>,
  title: string,
};

type Props = {
  onPressPlaylistListItem: Function,
  playlists: Array<Playlist>,
  onToggleModal: Function,
};

const getPodcastImages = (podcasts: Array<Object>): Array<string> => {
  const images = podcasts.slice(0, 4).map(podcast => podcast.smallImageURL);

  return images;
};

const PlaylistListComponent = ({
  onPressPlaylistListItem,
  onToggleModal,
  playlists,
}: Props): Object => (
  <Modal
    onRequestClose={onToggleModal}
    animationType="slide"
    hardwareAccelerated
    transparent
  >
    <Container>
      <HeaderWrapper>
        <TouchableOpacity
          onPress={onToggleModal}
        >
          <Icon
            name={Platform.OS === 'android' ? 'arrow-down' : 'chevron-down'}
            size={Platform.OS === 'ios' ? 34 : 28}
          />
        </TouchableOpacity>
        <PlaylistText>Playlists</PlaylistText>
      </HeaderWrapper>
      {playlists.length > 0 && (
        <FlatList
          renderItem={({ item, index }) => {
            const images = getPodcastImages(item.podcasts);

            return (
              <PlaylistListItem
                onPress={() => onPressPlaylistListItem(item)}
                numberOfPodcasts={item.podcasts.length}
                isDownloaded={item.isAvailableOffline}
                title={item.title}
                images={images}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item.title}`}
          data={playlists}
        />
      )}
    </Container>
  </Modal>
);

export default PlaylistListComponent;
