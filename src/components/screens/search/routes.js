import { createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import DEFAULT_HEADER_STYLE from '~/routes/utils/DEFAULT_HEADER_STYLE';
import SubjectDetail from '~/components/common/subject-detail';
import AuthorDetails from '~/components/common/author-detail';
import SearchAuthorsList from './components/search-author';
import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';
import Search from './index';

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
      screen: SubjectDetail,
      navigationOptions: ({ navigation }) => {
        const { params } = navigation.state;
        const subject = params[CONSTANTS.SUBJECT_DETAIL_PARAMS];
        const title = `#${subject.id}`;

        return {
          title,
          ...DEFAULT_HEADER_STYLE,
        };
      },
    },

    [ROUTE_NAMES.SEARCH_AUTHORS_RESULT]: {
      screen: SearchAuthorsList,
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

    [ROUTE_NAMES.AUTHOR_DETAILS]: {
      screen: AuthorDetails,
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
