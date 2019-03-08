import { createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import SubjectDetailContainer from '~/components/common/subject-detail/SubjectDetailContainer';
import SearchAuthorListContainer from './components/search-author/SearchAuthorListContainer';
import AuthorDetailContainer from '~/components/common/author-detail/AuthorDetailContainer';
import DEFAULT_HEADER_STYLE from '~/routes/utils/DEFAULT_HEADER_STYLE';
import CONSTANTS from '~/utils/CONSTANTS';
import Search from './SearchContainer';
import appStyles from '~/styles';

export const ROUTE_NAMES = {
  SEARCH: 'SEARCH',
  SUBJECT_DETAIL: 'SUBJECT_DETAIL',
  SEARCH_AUTHORS_RESULT: 'SEARCH_AUTHORS_RESULT',
  AUTHOR_DETAILS: 'AUTHOR_DETAILS',
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

    [ROUTE_NAMES.SUBJECT_DETAIL]: {
      screen: SubjectDetailContainer,
      navigationOptions: ({ navigation }) => {
        const { params } = navigation.state;
        const subject = params[CONSTANTS.SUBJECT_DETAIL_PARAMS];
        const title = `#${subject.id}`;

        return {
          title,
          ...DEFAULT_HEADER_STYLE,
          ...Platform.select({
            android: {
              headerStyle: {
                marginTop: 0,
              },
            },
          }),
        };
      },
    },

    [ROUTE_NAMES.SEARCH_AUTHORS_RESULT]: {
      screen: SearchAuthorListContainer,
      navigationOptions: () => ({
        title: 'Search Authors',
        ...DEFAULT_HEADER_STYLE,
        headerTransparent: false,
        headerStyle: {
          backgroundColor: appStyles.colors.dark,
          borderBottomWidth: 0,
          elevation: 0,
        },
      }),
    },

    [CONSTANTS.NAVIGATE_AUTHOR_DETAIL]: {
      screen: AuthorDetailContainer,
      navigationOptions: () => ({
        ...DEFAULT_HEADER_STYLE,
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
