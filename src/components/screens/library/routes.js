import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { StatusBar, Platform } from 'react-native';

import PodcastsDownloaded from './components/podcasts-downloaded/PodcastsDownloaded';
import AllPodcasts from './components/all-podcasts/AllPodcasts';
import PlaylistDetail from './components/playlist-detail/PlaylistDetailContainer';
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
  ALL_PODCASTS: 'ALL_PODCASTS',
  PODCASTS_DOWNLOADED: 'PODCASTS_DOWNLOADED',
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

    [ROUTE_NAMES.ALL_PODCASTS]: {
      screen: AllPodcasts,
      navigationOptions: () => ({
        ...DEFAULT_HEADER_STYLE,
        title: 'All Podcasts',
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
