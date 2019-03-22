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

type Playlist = {
  isAvailableOffline: boolean,
  dowloads: Array<string>,
  podcasts: Array<Object>,
  title: string,
};

type Props = {
  playlists: Array<Playlist>,
};

const getPodcastImages = (podcasts: Array<Object>): Array<string> => {
  const images = podcasts.slice(0, 4).map(podcast => podcast.smallImageURL);

  return images;
};

const Playlists = ({ playlists }: Props): Object => (
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
            onPress={() => {}}
            numberOfPodcasts={item.podcasts.length}
            isDownloaded={item.isAvailableOffline}
            title={item.title}
            images={images}
          />
        );
      }}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => `${item.title}`}
      data={[...playlists, ...playlists, ...playlists]}
    />
  </Wrapper>
);

export default Playlists;
