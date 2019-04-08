import React, { Component } from 'react';
import {
  createStackNavigator,
  createAppContainer,
  withNavigation,
} from 'react-navigation';
import { StatusBar, Platform } from 'react-native';
import { withTheme } from 'styled-components';

import AuthorDetailContainer from '~/components/common/author-detail/AuthorDetailContainer';
import PodcastsDownloaded from './components/PodcastsDownloaded';
import PlaylistDetail from './components/playlist-detail/PlaylistDetailContainer';
import RecentlyPlayed from './components/RecentlyPlayed';
import Playlists from './components/playlists/Playlists';
import YourPodcasts from './components/YourPodcasts';
import Interests from '~/components/common/interests/Interests';
import Player from '~/components/common/player/PlayerContainer';
import Library from './Library';

import PodcastDetailContainer from '~/components/common/podcast-detail/PodcastDetailContainer';
import {
  getDefaultHeaderWithButton,
  getDefaultHeaderWithTitle,
  getPlayerNavigationOption,
  getHiddenHeaderLayout,
  DEFAULT_HEADER_STYLE,
} from '~/routes/utils/navigationOptions';
import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

export const ROUTE_NAMES = {
  LIBRARY: 'LIBRARY',
  PLAYLIST_DETAIL: 'PLAYLIST_DETAIL',
  PLAYLISTS: 'PLAYLISTS',
  YOUR_PODCASTS: 'YOUR_PODCASTS',
  PODCASTS_DOWNLOADED: 'PODCASTS_DOWNLOADED',
  RECENTLY_PLAYED: 'RECENTLY_PLAYED',
};

const RootStack = createStackNavigator(
  {
    [CONSTANTS.ROUTES.LIBRARY]: {
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
      navigationOptions: ({ navigation, screenProps }) => getDefaultHeaderWithTitle('', navigation, screenProps),
    },

    [ROUTE_NAMES.PLAYLISTS]: {
      screen: Playlists,
      navigationOptions: ({ navigation, screenProps }) => getDefaultHeaderWithButton(
        navigation,
        screenProps,
        'Playlists',
        'plus',
      ),
    },

    [CONSTANTS.ROUTES.PODCAST_DETAIL]: {
      screen: PodcastDetailContainer,
      navigationOptions: ({ navigation, screenProps }) => getDefaultHeaderWithTitle('Podcast Detail', navigation, screenProps),
    },

    [CONSTANTS.ROUTES.AUTHOR_DETAIL]: {
      screen: AuthorDetailContainer,
      navigationOptions: ({ screenProps }) => getHiddenHeaderLayout(screenProps),
    },

    [ROUTE_NAMES.YOUR_PODCASTS]: {
      screen: YourPodcasts,
      navigationOptions: ({ navigation, screenProps }) => getDefaultHeaderWithButton(
        navigation,
        screenProps,
        'Your Podcasts',
        'play-circle-outline',
      ),
    },

    [ROUTE_NAMES.PODCASTS_DOWNLOADED]: {
      screen: PodcastsDownloaded,
      navigationOptions: ({ navigation, screenProps }) => getDefaultHeaderWithButton(
        navigation,
        screenProps,
        'Downloads',
        'play-circle-outline',
      ),
    },

    [ROUTE_NAMES.RECENTLY_PLAYED]: {
      screen: RecentlyPlayed,
      navigationOptions: ({ navigation, screenProps }) => getDefaultHeaderWithButton(
        navigation,
        screenProps,
        'Recently Played',
        'play-circle-outline',
      ),
    },

    [CONSTANTS.ROUTES.INTERESTS]: {
      screen: Interests,
      navigationOptions: ({ navigation, screenProps }) => getDefaultHeaderWithTitle('Your Interests', navigation, screenProps),
    },
  },
  {
    initialRouteName: CONSTANTS.ROUTES.LIBRARY,
    mode: Platform.OS === 'ios' ? 'card' : 'modal',
    headerLayoutPreset: 'center',
    headerMode: 'screen',
  },
);

export default RootStack;
