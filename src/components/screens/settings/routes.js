import { createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import {
  getPlayerNavigationOption,
  getDefaultNavigationWithTitle,
} from '~/routes/utils/navigationOptions';
import Player from '~/components/common/player/PlayerContainer';
import CONSTANTS from '~/utils/CONSTANTS';

import Settings from './Settings';
import About from './about/About';

export const ROUTE_NAMES = {
  ABOUT: 'ABOUT',
};

const RootStack = createStackNavigator(
  {
    [CONSTANTS.ROUTES.SETTINGS]: {
      screen: Settings,
      navigationOptions: () => ({
        headerBackTitle: null,
        header: null,
      }),
    },

    [CONSTANTS.ROUTES.PLAYER]: {
      screen: Player,
      navigationOptions: ({ navigation }) => getPlayerNavigationOption(navigation),
    },

    [ROUTE_NAMES.ABOUT]: {
      screen: About,
      navigationOptions: ({ navigation, screenProps }) => getDefaultNavigationWithTitle('About', navigation, screenProps),
    },
  },
  {
    initialRouteName: CONSTANTS.ROUTES.SETTINGS,
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
