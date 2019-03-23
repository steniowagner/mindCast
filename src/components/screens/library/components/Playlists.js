// @flow

import React from 'react';
import {
  TouchableOpacity, FlatList, View, Text,
} from 'react-native';
import styled from 'styled-components';

import PlaylistListItem from './PlaylistListItem';
import Icon from '~/components/common/Icon';
import appStyles from '~/styles';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  padding-top: ${({ theme }) => theme.metrics.largeSize}px;
`;

const PlaylistsText = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('6.5%')}px;
  font-family: CircularStd-Bold;
  color: ${({ theme }) => theme.colors.white};
`;

const Header = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
`;

const getPodcastImages = (podcasts: Array<Object>): Array<string> => {
  const images = podcasts.slice(0, 4).map(podcast => podcast.smallImageURL);

  return images;
};

type Playlist = {
  isAvailableOffline: boolean,
  dowloads: Array<string>,
  podcasts: Array<Object>,
  title: string,
};

type Props = {
  onTogglePlaylistOperationModal: Function,
  onPressPlaylistItem: Function,
  onRemovePlaylist: Function,
  playlists: Array<Playlist>,
  modalOperations: Object,
};

const Playlists = ({
  onTogglePlaylistOperationModal,
  onPressPlaylistItem,
  onRemovePlaylist,
  modalOperations,
  playlists,
}: Props): Object => (
  <Wrapper>
    <Header>
      <PlaylistsText>Playlists</PlaylistsText>
      <TouchableOpacity
        hitSlop={{
          bottom: appStyles.metrics.smallSize,
          right: appStyles.metrics.smallSize,
          left: appStyles.metrics.smallSize,
          top: appStyles.metrics.smallSize,
        }}
        onPress={() => onTogglePlaylistOperationModal(modalOperations.CREATE)}
      >
        <Icon
          color={appStyles.colors.white}
          name="plus"
          size={26}
        />
      </TouchableOpacity>
    </Header>
    <FlatList
      renderItem={({ item, index }) => {
        const images = getPodcastImages(item.podcasts);

        return (
          <PlaylistListItem
            onEditPlaylist={() => onTogglePlaylistOperationModal(
              modalOperations.EDIT,
              item.title,
              index,
            )
            }
            onRemovePlaylist={() => onRemovePlaylist(item)}
            onPress={() => onPressPlaylistItem(item.title)}
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
  </Wrapper>
);

export default Playlists;
