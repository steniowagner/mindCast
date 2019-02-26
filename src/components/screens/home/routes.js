import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { StatusBar, Platform } from 'react-native';

import Player from './components/player';
import Home from './index';

import {
  HeaderButton,
  POSITIONS,
} from './components/player/components/HeaderButton';
import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

export const ROUTE_NAMES = {
  HOME: 'HOME',
  PLAYER: 'PLAYER',
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

    [ROUTE_NAMES.PLAYER]: {
      screen: Player,
      navigationOptions: ({ navigation }) => {
        const { state } = navigation;
        const isNavigationParamsDefined = !!state && !!state.params;
        const isRightMenuOpen = isNavigationParamsDefined
          && state.params[CONSTANTS.IS_PLAYER_RIGHT_MENU_OPEN];

        return {
          header: isRightMenuOpen ? null : undefined,
          title: '#astrophysics',
          headerRight: (
            <HeaderButton
              onPress={() => {
                if (isNavigationParamsDefined) {
                  const onPressHeaderRightButton = state.params[CONSTANTS.HEADER_BUTTON_RIGHT_PLAYER_ACTION];

                  onPressHeaderRightButton();
                }
              }}
              iconName="format-list-bulleted"
              position={POSITIONS.RIGHT}
            />
          ),
          headerTintColor: appStyles.colors.white,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'transparent',
            borderBottomWidth: 0,
          },
          titleStyle: {
            color: appStyles.colors.defaultWhite,
          },
          headerTitleStyle: {
            fontFamily: 'CircularStd-Bold',
            fontSize: appStyles.metrics.extraLargeSize,
          },
          ...Platform.select({
            android: {
              headerStyle: {
                marginTop: StatusBar.currentHeight,
              },
            },
          }),
        };
      },
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
