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
import HeaderActionButton from './components/HeaderActionButton';
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

const getDefaultLibraryHeader = title => ({
  ...DEFAULT_HEADER_STYLE,
  headerTransparent: false,
  title,
  headerStyle: {
    backgroundColor: appStyles.colors.dark,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    borderBottomWidth: 0,
    elevation: 0,
  },
});

const getDefaultLibraryHeaderWithButton = (navigation, title) => {
  const { params } = navigation.state;

  const onPressHeaderButton = params && params[CONSTANTS.PARAMS.HEADER_PLAY_ACTION];

  return {
    ...getDefaultLibraryHeader(title),
    headerRight: <HeaderActionButton
      onPress={onPressHeaderButton}
    />,
  };
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
      navigationOptions: () => getDefaultLibraryHeader(''),
    },

    [CONSTANTS.ROUTES.PODCAST_DETAIL]: {
      screen: PodcastDetailContainer,
      navigationOptions: () => getDefaultLibraryHeader('Podcast Detail'),
    },

    [CONSTANTS.ROUTES.AUTHOR_DETAIL]: {
      screen: AuthorDetailContainer,
      navigationOptions: () => DEFAULT_HEADER_STYLE,
    },

    [ROUTE_NAMES.YOUR_PODCASTS]: {
      screen: YourPodcasts,
      navigationOptions: ({ navigation }) => getDefaultLibraryHeaderWithButton(navigation, 'Your Podcasts'),
    },

    [ROUTE_NAMES.PODCASTS_DOWNLOADED]: {
      screen: PodcastsDownloaded,
      navigationOptions: ({ navigation }) => getDefaultLibraryHeaderWithButton(navigation, 'Downloads'),
    },

    [ROUTE_NAMES.RECENTLY_PLAYED]: {
      screen: RecentlyPlayed,
      navigationOptions: ({ navigation }) => getDefaultLibraryHeaderWithButton(navigation, 'Recently Played'),
    },

    [CONSTANTS.ROUTES.INTERESTS]: {
      screen: Interests,
      navigationOptions: () => getDefaultLibraryHeader('Your Interests'),
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
