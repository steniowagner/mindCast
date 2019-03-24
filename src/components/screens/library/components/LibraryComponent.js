// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import ScreenTitle from '~/components/common/ScreenTitle';
import LibraryOptionItem from './LibraryOptionItem';
import Playlists from './Playlists';
import { ROUTE_NAMES } from '../routes';
import CONSTANTS from '~/utils/CONSTANTS';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.dark};
`;

const ContentWrapper = styled(View)`
  width: 100%;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  padding-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const Divider = styled(View)`
  width: 100%;
  height: 0.5px;
  background-color: ${({ theme }) => theme.colors.subTextWhite};
`;

const getOptionsItems = (
  onPressAllPodcastsOption,
  onPressDownloadsOption,
  onPressRecentlyPlayedOption,
  onPressInterestsOption,
): Array<Object> => {
  const options = [
    {
      onPress: onPressAllPodcastsOption,
      title: 'All Podcasts',
      iconName: 'podcast',
    },
    {
      onPress: onPressDownloadsOption,
      title: 'Downloads',
      iconName: 'cloud-download-outline',
    },
    {
      onPress: onPressRecentlyPlayedOption,
      title: 'Recently Played',
      iconName: 'clock-outline',
    },
    {
      onPress: onPressInterestsOption,
      title: 'Interests',
      iconName: 'playlist-check',
    },
  ];

  return options;
};

type Playlist = {
  isAvailableOffline: boolean,
  dowloads: Array<string>,
  podcasts: Array<Object>,
  title: string,
};

type Props = {
  onTogglePlaylistOperationModal: Function,
  podcastsDownloaded: Array<Object>,
  onPressPlaylistItem: Function,
  playlists: Array<Playlist>,
  onRemovePlaylist: Function,
  onEditPlaylist: Function,
  modalOperations: Object,
  navigation: Object,
};

const LibraryComponent = ({
  onTogglePlaylistOperationModal,
  onPressPlaylistItem,
  podcastsDownloaded,
  onRemovePlaylist,
  modalOperations,
  onEditPlaylist,
  navigation,
  playlists,
}: Props): Object => {
  const onPressAllPodcastsOption = () => {
    navigation.navigate(ROUTE_NAMES.ALL_PODCASTS, {
      [CONSTANTS.PARAMS.ALL_PODCASTS]: playlists
        .map(playlist => playlist.podcasts)
        .reduce((acc, curr) => acc.concat(...curr), []),
    });
  };

  const onPressDownloadsOption = () => {
    navigation.navigate(ROUTE_NAMES.PODCASTS_DOWNLOADED, {
      [CONSTANTS.PARAMS.PODCASTS_DOWNLOADED]: podcastsDownloaded,
    });
  };

  const options = getOptionsItems(
    onPressAllPodcastsOption,
    onPressDownloadsOption,
  );

  return (
    <Wrapper>
      <ScreenTitle
        title="Library"
      />
      <ContentWrapper>
        {options.map(option => (
          <LibraryOptionItem
            onPressItem={option.onPress}
            iconName={option.iconName}
            title={option.title}
            key={option.title}
          />
        ))}
      </ContentWrapper>
      <Divider />
      <Playlists
        onTogglePlaylistOperationModal={onTogglePlaylistOperationModal}
        onPressPlaylistItem={onPressPlaylistItem}
        onRemovePlaylist={onRemovePlaylist}
        modalOperations={modalOperations}
        playlists={playlists}
      />
    </Wrapper>
  );
};

export default LibraryComponent;
