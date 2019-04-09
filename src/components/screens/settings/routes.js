import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import {
  getPlayerNavigationOption,
  getDefaultHeaderWithTitle,
} from '~/routes/utils/navigationOptions';
import Player from '~/components/common/player/PlayerContainer';
import CONSTANTS from '~/utils/CONSTANTS';

import Settings from './Settings';
import About from './about/About';

const LOCAL_STACK_ROUTES = {
  ABOUT: 'ABOUT',
};

const RootStack = createStackNavigator(
  {
    [CONSTANTS.ROUTES.SETTINGS]: {
      screen: props => (
        <Settings
          {...props}
          LOCAL_STACK_ROUTES={LOCAL_STACK_ROUTES}
        />
      ),
      navigationOptions: () => ({
        headerBackTitle: null,
        header: null,
      }),
    },

    [CONSTANTS.ROUTES.PLAYER]: {
      screen: Player,
      navigationOptions: ({ navigation }) => getPlayerNavigationOption(navigation),
    },

    [LOCAL_STACK_ROUTES.ABOUT]: {
      screen: About,
      navigationOptions: ({ navigation, screenProps }) => getDefaultHeaderWithTitle('About', navigation, screenProps),
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
