import { createStackNavigator } from 'react-navigation';
import { StatusBar, Platform } from 'react-native';

import SubjectDetailContainer from './components/subject-detail/SubjectDetailContainer';
import PodcastDetailContainer from '~/components/common/podcast-detail/PodcastDetailContainer';
import SearchAuthorListContainer from './components/search-author/SearchAuthorListContainer';
import AuthorDetailContainer from '~/components/common/author-detail/AuthorDetailContainer';
import Player from '~/components/common/player/PlayerContainer';
import Search from './SearchContainer';

import {
  getPlayerNavigationOption,
  getDefaultNavigationWithTitle,
  getHiddenHeaderLayout,
} from '~/routes/utils/navigationOptions';
import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

export const ROUTE_NAMES = {
  SEARCH_AUTHORS_RESULT: 'SEARCH_AUTHORS_RESULT',
};

const RootStack = createStackNavigator(
  {
    [CONSTANTS.ROUTES.SEARCH]: {
      screen: Search,
      navigationOptions: () => ({
        headerBackTitle: null,
        header: null,
      }),
    },

    [ROUTE_NAMES.SEARCH_AUTHORS_RESULT]: {
      screen: SearchAuthorListContainer,
      navigationOptions: ({ navigation, screenProps }) => getDefaultNavigationWithTitle(
        'Search Authors',
        navigation,
        screenProps,
      ),
    },

    [CONSTANTS.ROUTES.SUBJECT_DETAIL]: {
      screen: SubjectDetailContainer,
      navigationOptions: ({ navigation, screenProps }) => {
        const { params } = navigation.state;
        const subject = params[CONSTANTS.PARAMS.SUBJECT_DETAIL];
        const title = `#${subject.id}`;

        return {
          title,
          ...getHiddenHeaderLayout(screenProps),
        };
      },
    },

    [CONSTANTS.ROUTES.AUTHOR_DETAIL]: {
      screen: AuthorDetailContainer,
      navigationOptions: ({ screenProps }) => getHiddenHeaderLayout(screenProps),
    },

    [CONSTANTS.ROUTES.PODCAST_DETAIL]: {
      screen: PodcastDetailContainer,
      navigationOptions: ({ navigation, screenProps }) => getDefaultNavigationWithTitle(
        'Podcast Detail',
        navigation,
        screenProps,
      ),
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
