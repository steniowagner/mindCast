import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import AuthorDetailContainer from '~/components/common/author-detail/AuthorDetailContainer';
import TrendingAuthorsSeeAll from './components/trending-authors/TrendingAuthorsSeeAll';
import HottestPodcastsSeeAll from './components/hottest-podcasts/HottestPodcastsSeeAll';
import NewReleasesSeeAll from './components/new-releases/NewReleasesSeeAll';

import PodcastDetailContainer from '~/components/common/podcast-detail/PodcastDetailContainer';
import Player from '~/components/common/player/PlayerContainer';
import Home from './Home';

import {
  getDefaultHeaderWithButton,
  getDefaultHeaderWithTitle,
  getPlayerNavigationOption,
  getHiddenHeaderLayout,
} from '~/routes/utils/navigationOptions';
import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

const LOCAL_STACK_ROUTES = {
  TRENDING_AUTHORS_SEE_ALL: 'TRENDING_AUTHORS_SEE_ALL',
  HOTTEST_PODCASTS_SEE_ALL: 'HOTTEST_PODCASTS_SEE_ALL',
  NEW_RELEASES_SEE_ALL: 'NEW_RELEASES_SEE_ALL',
};

const RootStack = createStackNavigator(
  {
    [CONSTANTS.ROUTES.HOME]: {
      screen: props => (
        <Home
          {...props}
          LOCAL_STACK_ROUTES={LOCAL_STACK_ROUTES}
        />
      ),
      navigationOptions: () => ({
        headerBackTitle: null,
        headerTransparent: true,
      }),
    },

    [CONSTANTS.ROUTES.PODCAST_DETAIL]: {
      screen: PodcastDetailContainer,
      navigationOptions: ({ navigation, screenProps }) => getDefaultHeaderWithTitle('Podcast Detail', navigation, screenProps),
    },

    [LOCAL_STACK_ROUTES.TRENDING_AUTHORS_SEE_ALL]: {
      screen: TrendingAuthorsSeeAll,
      navigationOptions: ({ navigation, screenProps }) => getDefaultHeaderWithTitle('Trending Authors', navigation, screenProps),
    },

    [LOCAL_STACK_ROUTES.HOTTEST_PODCASTS_SEE_ALL]: {
      screen: HottestPodcastsSeeAll,
      navigationOptions: ({ navigation, screenProps }) => getDefaultHeaderWithButton(
        navigation,
        screenProps,
        'Hottest Podcasts',
        'play-circle-outline',
      ),
    },

    [LOCAL_STACK_ROUTES.NEW_RELEASES_SEE_ALL]: {
      screen: NewReleasesSeeAll,
      navigationOptions: ({ navigation, screenProps }) => getDefaultHeaderWithButton(
        navigation,
        screenProps,
        'New Releases',
        'play-circle-outline',
      ),
    },

    [CONSTANTS.ROUTES.AUTHOR_DETAIL]: {
      screen: AuthorDetailContainer,
      navigationOptions: ({ screenProps }) => getHiddenHeaderLayout(screenProps),
    },

    [CONSTANTS.ROUTES.PLAYER]: {
      screen: Player,
      navigationOptions: ({ navigation }) => getPlayerNavigationOption(navigation),
    },
  },
  {
    initialRouteName: LOCAL_STACK_ROUTES.HOME,
    mode: Platform.OS === 'ios' ? 'card' : 'modal',
    headerLayoutPreset: 'center',
    headerMode: 'screen',
  },
);

export default RootStack;
