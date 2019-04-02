import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { StatusBar, Platform } from 'react-native';

import AuthorDetailContainer from '~/components/common/author-detail/AuthorDetailContainer';
import PodcastsDownloaded from './components/PodcastsDownloaded';
import PlaylistDetail from './components/playlist-detail/PlaylistDetailContainer';
import RecentlyPlayed from './components/RecentlyPlayed';
import YourPodcasts from './components/YourPodcasts';
import Interests from '~/components/common/interests/Interests';
import Player from '~/components/common/player/PlayerContainer';
import Library from './Library';

import PodcastDetailContainer from '~/components/common/podcast-detail/PodcastDetailContainer';
import {
  getDefaultHeaderWithPlayButton,
  getDefaultNavigationWithTitle,
  getPlayerNavigationOption,
} from '~/routes/utils/navigationOptions';
import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

export const ROUTE_NAMES = {
  LIBRARY: 'LIBRARY',
  PLAYLIST_DETAIL: 'PLAYLIST_DETAIL',
  YOUR_PODCASTS: 'YOUR_PODCASTS',
  PODCASTS_DOWNLOADED: 'PODCASTS_DOWNLOADED',
  RECENTLY_PLAYED: 'RECENTLY_PLAYED',
};

const RootStack = createStackNavigator(
  {
    [ROUTE_NAMES.LIBRARY]: {
      screen: Library,
      navigationOptions: () => ({
        headerBackTitle: null,
        header: null,
      }),
    },

    [CONSTANTS.ROUTES.PLAYER]: {
      screen: Player,
      navigationOptions: ({ navigation }) => getPlayerNavigationOption(navigation),
    },

    [ROUTE_NAMES.PLAYLIST_DETAIL]: {
      screen: PlaylistDetail,
      navigationOptions: () => getDefaultNavigationWithTitle(''),
    },

    [CONSTANTS.ROUTES.PODCAST_DETAIL]: {
      screen: PodcastDetailContainer,
      navigationOptions: () => getDefaultNavigationWithTitle('Podcast Detail'),
    },

    [CONSTANTS.ROUTES.AUTHOR_DETAIL]: {
      screen: AuthorDetailContainer,
      navigationOptions: () => DEFAULT_HEADER_STYLE,
    },

    [ROUTE_NAMES.YOUR_PODCASTS]: {
      screen: YourPodcasts,
      navigationOptions: ({ navigation }) => getDefaultHeaderWithPlayButton(navigation, 'Your Podcasts'),
    },

    [ROUTE_NAMES.PODCASTS_DOWNLOADED]: {
      screen: PodcastsDownloaded,
      navigationOptions: ({ navigation }) => getDefaultHeaderWithPlayButton(navigation, 'Downloads'),
    },

    [ROUTE_NAMES.RECENTLY_PLAYED]: {
      screen: RecentlyPlayed,
      navigationOptions: ({ navigation }) => getDefaultHeaderWithPlayButton(navigation, 'Recently Played'),
    },

    [CONSTANTS.ROUTES.INTERESTS]: {
      screen: Interests,
      navigationOptions: () => getDefaultNavigationWithTitle('Your Interests'),
    },
  },
  {
    initialRouteName: ROUTE_NAMES.HOME,
    mode: Platform.OS === 'ios' ? 'card' : 'modal',
    headerLayoutPreset: 'center',
    headerMode: 'screen',
  },
);

RootStack.navigationOptions = ({ navigation }) => {
  const tabBarVisible = navigation.state.index <= 0;

  return {
    tabBarVisible,
  };
};

export default RootStack;
