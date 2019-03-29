import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { StatusBar, Platform } from 'react-native';

import TrendingAuthorsSeeAll from './components/trending-authors/TrendingAuthorsSeeAll';
import HottestPodcastsSeeAll from './components/hottest-podcasts/HottestPodcastsSeeAll';
import NewReleasesSeeAll from './components/new-releases/NewReleasesSeeAll';

import PodcastDetailContainer from '~/components/common/podcast-detail/PodcastDetailContainer';
import Player from '~/components/common/player/PlayerContainer';
import Home from './Home';

import getPlayerNavigationOption from '~/routes/utils/getPlayerNavigationOption';
import DEFAULT_HEADER_STYLE from '~/routes/utils/DEFAULT_HEADER_STYLE';
import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

export const ROUTE_NAMES = {
  TRENDING_AUTHORS_SEE_ALL: 'TRENDING_AUTHORS_SEE_ALL',
  HOTTEST_PODCASTS_SEE_ALL: 'HOTTEST_PODCASTS_SEE_ALL',
  NEW_RELEASES_SEE_ALL: 'NEW_RELEASES_SEE_ALL',
  HOME: 'HOME',
};

const RootStack = createStackNavigator(
  {
    [ROUTE_NAMES.HOME]: {
      screen: Home,
      navigationOptions: () => ({
        headerBackTitle: null,
        header: null,
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

    [ROUTE_NAMES.TRENDING_AUTHORS_SEE_ALL]: {
      screen: TrendingAuthorsSeeAll,
      navigationOptions: () => ({
        ...DEFAULT_HEADER_STYLE,
        title: 'Trending Authors',
        headerTransparent: false,
        headerStyle: {
          backgroundColor: appStyles.colors.dark,
          marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          borderBottomWidth: 0,
          elevation: 0,
        },
      }),
    },

    [ROUTE_NAMES.HOTTEST_PODCASTS_SEE_ALL]: {
      screen: HottestPodcastsSeeAll,
      navigationOptions: () => ({
        ...DEFAULT_HEADER_STYLE,
        title: 'Hottest Podcasts',
        headerTransparent: false,
        headerStyle: {
          backgroundColor: appStyles.colors.dark,
          marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          borderBottomWidth: 0,
          elevation: 0,
        },
      }),
    },

    [ROUTE_NAMES.NEW_RELEASES_SEE_ALL]: {
      screen: NewReleasesSeeAll,
      navigationOptions: () => ({
        ...DEFAULT_HEADER_STYLE,
        title: 'New Releases',
        headerTransparent: false,
        headerStyle: {
          backgroundColor: appStyles.colors.dark,
          marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          borderBottomWidth: 0,
          elevation: 0,
        },
      }),
    },

    [CONSTANTS.ROUTES.PLAYER]: {
      screen: Player,
      navigationOptions: ({ navigation }) => getPlayerNavigationOption(navigation),
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
