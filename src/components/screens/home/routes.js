import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { StatusBar, Platform } from 'react-native';

import AuthorDetailContainer from '~/components/common/author-detail/AuthorDetailContainer';
import TrendingAuthorsSeeAll from './components/trending-authors/TrendingAuthorsSeeAll';
import HottestPodcastsSeeAll from './components/hottest-podcasts/HottestPodcastsSeeAll';
import NewReleasesSeeAll from './components/new-releases/NewReleasesSeeAll';

import PodcastDetailContainer from '~/components/common/podcast-detail/PodcastDetailContainer';
import Player from '~/components/common/player/PlayerContainer';
import Home from './Home';

import {
  getDefaultNavigationWithTitle,
  getPlayerNavigationOption,
  DEFAULT_HEADER_STYLE,
} from '~/routes/utils/navigationOptions';
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
      navigationOptions: () => getDefaultNavigationWithTitle('Podcast Detail'),
    },

    [ROUTE_NAMES.TRENDING_AUTHORS_SEE_ALL]: {
      screen: TrendingAuthorsSeeAll,
      navigationOptions: () => getDefaultNavigationWithTitle('Trending Authors'),
    },

    [ROUTE_NAMES.HOTTEST_PODCASTS_SEE_ALL]: {
      screen: HottestPodcastsSeeAll,
      navigationOptions: () => getDefaultNavigationWithTitle('Hottest Podcasts'),
    },

    [ROUTE_NAMES.NEW_RELEASES_SEE_ALL]: {
      screen: NewReleasesSeeAll,
      navigationOptions: () => getDefaultNavigationWithTitle('New Releases'),
    },

    [CONSTANTS.ROUTES.AUTHOR_DETAIL]: {
      screen: AuthorDetailContainer,
      navigationOptions: () => DEFAULT_HEADER_STYLE,
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
