// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import ScreenTitle from '~/components/common/ScreenTitle';
import LibraryOptionItem from './LibraryOptionItem';
import Playlists from './Playlists';

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
  playlists: Array<Playlist>,
};

const LibraryComponent = ({ playlists }: Props): Object => {
  const options = getOptionsItems();

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
        playlists={playlists}
      />
    </Wrapper>
  );
};

export default LibraryComponent;
