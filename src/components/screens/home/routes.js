import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { StatusBar, Platform } from 'react-native';

import Player from '~/components/common/player/PlayerContainer';
import Home from './index';

import CONSTANTS from '~/utils/CONSTANTS';
import getPlayerNavigationOption from '~/routes/utils/getPlayerNavigationOption';

export const ROUTE_NAMES = {
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

    [CONSTANTS.NAVIGATE_PLAYER]: {
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
