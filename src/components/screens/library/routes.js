import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { StatusBar, Platform } from 'react-native';

import PodcastsDownloaded from './components/podcasts-downloaded/PodcastsDownloaded';
import YourPodcasts from './components/your-podcasts/YourPodcasts';
import PlaylistDetail from './components/playlist-detail/PlaylistDetailContainer';
import RecentlyPlayed from './components/recently-played/RecentlyPlayed';
import Interests from '~/components/common/interests/Interests';
import Player from '~/components/common/player/PlayerContainer';
import Library from './Library';

import PodcastDetailContainer from '~/components/common/podcast-detail/PodcastDetailContainer';
import getPlayerNavigationOption from '~/routes/utils/getPlayerNavigationOption';
import DEFAULT_HEADER_STYLE from '~/routes/utils/DEFAULT_HEADER_STYLE';
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
      navigationOptions: () => ({
        ...DEFAULT_HEADER_STYLE,
        headerTransparent: false,
        headerStyle: {
          backgroundColor: appStyles.colors.dark,
          marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          borderBottomWidth: 0,
          elevation: 0,
        },
      }),
    },

    [CONSTANTS.ROUTES.PODCAST_DETAIL]: {
      screen: PodcastDetailContainer,
      navigationOptions: () => ({
        ...DEFAULT_HEADER_STYLE,
        title: 'Podcast Detail',
        headerTransparent: false,
        headerStyle: {
          backgroundColor: appStyles.colors.dark,
          marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          borderBottomWidth: 0,
          elevation: 0,
        },
      }),
    },

    [ROUTE_NAMES.YOUR_PODCASTS]: {
      screen: YourPodcasts,
      navigationOptions: () => ({
        ...DEFAULT_HEADER_STYLE,
        title: 'Your Podcasts',
        headerTransparent: false,
        headerStyle: {
          backgroundColor: appStyles.colors.dark,
          borderBottomWidth: 0,
          elevation: 0,
        },
      }),
    },

    [CONSTANTS.ROUTES.INTERESTS]: {
      screen: Interests,
      navigationOptions: () => ({
        ...DEFAULT_HEADER_STYLE,
        title: 'Your Interests',
        headerTransparent: false,
        headerStyle: {
          backgroundColor: appStyles.colors.dark,
          borderBottomWidth: 0,
          elevation: 0,
        },
      }),
    },

    [ROUTE_NAMES.RECENTLY_PLAYED]: {
      screen: RecentlyPlayed,
      navigationOptions: () => ({
        ...DEFAULT_HEADER_STYLE,
        title: 'Recently Played',
        headerTransparent: false,
        headerStyle: {
          backgroundColor: appStyles.colors.dark,
          borderBottomWidth: 0,
          elevation: 0,
        },
      }),
    },

    [ROUTE_NAMES.PODCASTS_DOWNLOADED]: {
      screen: PodcastsDownloaded,
      navigationOptions: () => ({
        ...DEFAULT_HEADER_STYLE,
        title: 'Downloads',
        headerTransparent: false,
        headerStyle: {
          backgroundColor: appStyles.colors.dark,
          borderBottomWidth: 0,
          elevation: 0,
        },
      }),
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
