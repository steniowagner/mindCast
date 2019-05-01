import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import SubjectDetailContainer from './components/subject-detail/SubjectDetailContainer';
import PodcastDetailContainer from '~/components/common/podcast-detail/PodcastDetailContainer';
import SearchAuthorListContainer from './components/search-author/SearchAuthorListContainer';
import AuthorDetailContainer from '~/components/common/author-detail/AuthorDetailContainer';
import Player from '~/components/common/player/PlayerContainer';
import Search from './SearchContainer';

import {
  getPlayerNavigationOption,
  getDefaultHeaderWithTitle,
  getHiddenHeaderLayout,
} from '~/routes/utils/navigationOptions';
import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

const LOCAL_STACK_ROUTES = {
  SEARCH_AUTHORS_RESULT: 'SEARCH_AUTHORS_RESULT',
};

const RootStack = createStackNavigator(
  {
    [CONSTANTS.ROUTES.SEARCH]: {
      screen: props => (
        <Search
          {...props}
          LOCAL_STACK_ROUTES={LOCAL_STACK_ROUTES}
        />
      ),
      navigationOptions: () => ({
        headerBackTitle: null,
        header: null,
      }),
    },

    [LOCAL_STACK_ROUTES.SEARCH_AUTHORS_RESULT]: {
      screen: SearchAuthorListContainer,
      navigationOptions: ({ navigation, screenProps }) => getDefaultHeaderWithTitle('Search Authors', navigation, screenProps),
    },

    [CONSTANTS.ROUTES.SUBJECT_DETAIL]: {
      screen: SubjectDetailContainer,
      navigationOptions: ({ navigation, screenProps }) => {
        const { params } = navigation.state;
        const subject = params[CONSTANTS.PARAMS.SUBJECT_DETAIL];
        const title = `#${subject.id}`;

        const { colors } = screenProps.theme;
        const headerTextColor = params[CONSTANTS.PARAMS.HAS_ERROR]
          ? colors.textColor
          : '#fff';

        return {
          title,
          ...getHiddenHeaderLayout(screenProps, headerTextColor),
        };
      },
    },

    [CONSTANTS.ROUTES.AUTHOR_DETAIL]: {
      screen: AuthorDetailContainer,
      navigationOptions: ({ screenProps }) => getHiddenHeaderLayout(screenProps),
    },

    [CONSTANTS.ROUTES.PODCAST_DETAIL]: {
      screen: PodcastDetailContainer,
      navigationOptions: ({ navigation, screenProps }) => getDefaultHeaderWithTitle('Podcast Detail', navigation, screenProps),
    },

    [CONSTANTS.ROUTES.PLAYER]: {
      screen: Player,
      navigationOptions: ({ navigation }) => getPlayerNavigationOption(navigation),
    },
  },
  {
    initialRouteName: CONSTANTS.ROUTES.SEARCH,
    mode: Platform.OS === 'ios' ? 'card' : 'modal',
    headerLayoutPreset: 'center',
    headerMode: 'screen',
  },
);

export default RootStack;
