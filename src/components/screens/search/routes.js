import { createStackNavigator } from 'react-navigation';
import { StatusBar, Platform } from 'react-native';

import SubjectDetailContainer from '~/components/common/subject-detail/SubjectDetailContainer';
import SearchAuthorListContainer from './components/search-author/SearchAuthorListContainer';
import AuthorDetailContainer from '~/components/common/author-detail/AuthorDetailContainer';
import PodcastDetailContainer from '~/components/common/podcast-detail/PodcastDetailContainer';
import getPlayerNavigationOption from '~/routes/utils/getPlayerNavigationOption';
import DEFAULT_HEADER_STYLE from '~/routes/utils/DEFAULT_HEADER_STYLE';
import Player from '~/components/common/player/PlayerContainer';
import CONSTANTS from '~/utils/CONSTANTS';
import Search from './SearchContainer';
import appStyles from '~/styles';

export const ROUTE_NAMES = {
  SEARCH_AUTHORS_RESULT: 'SEARCH_AUTHORS_RESULT',
  SEARCH: 'SEARCH',
};

const RootStack = createStackNavigator(
  {
    [ROUTE_NAMES.SEARCH]: {
      screen: Search,
      navigationOptions: () => ({
        headerBackTitle: null,
        header: null,
      }),
    },

    [ROUTE_NAMES.SEARCH_AUTHORS_RESULT]: {
      screen: SearchAuthorListContainer,
      navigationOptions: () => ({
        ...DEFAULT_HEADER_STYLE,
        title: 'Search Authors',
        headerTransparent: false,
        headerStyle: {
          backgroundColor: appStyles.colors.dark,
          borderBottomWidth: 0,
          elevation: 0,
        },
      }),
    },

    [CONSTANTS.ROUTES.SUBJECT_DETAIL]: {
      screen: SubjectDetailContainer,
      navigationOptions: ({ navigation }) => {
        const { params } = navigation.state;
        const subject = params[CONSTANTS.PARAMS.SUBJECT_DETAIL];
        const title = `#${subject.id}`;

        return {
          ...DEFAULT_HEADER_STYLE,
          title,
        };
      },
    },

    [CONSTANTS.ROUTES.AUTHOR_DETAIL]: {
      screen: AuthorDetailContainer,
      navigationOptions: () => DEFAULT_HEADER_STYLE,
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
