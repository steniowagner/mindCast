// @flow

import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  createMaterialTopTabNavigator,
  createAppContainer,
} from 'react-navigation';

import HomeRoutes from '~/components/screens/home/routes';

import isEqualsOrLargestThanIphoneX from '~/utils/isEqualsOrLargestThanIphoneX';
import appStyles from '~/styles';

export const ROUTE_NAMES = {
  HOME: 'HOME',
  SEARCH_PODCASTS: 'SEARCH',
  LIBRARY: 'LIBRARY',
  PROFILE: 'PROFILE',
  SETTINGS: 'SETTINGS',
};

type Props = {
  tintColor: string,
};

const getTabIcon = (icon: string): Object => ({ tintColor }: Props) => (
  <Icon
    color={tintColor}
    name={icon}
    size={25}
  />
);

const ApplicationTabs = createMaterialTopTabNavigator(
  {
    [ROUTE_NAMES.HOME]: {
      screen: HomeRoutes,
      header: null,
      navigationOptions: {
        tabBarIcon: getTabIcon('compass-outline'),
      },
    },
  },
  {
    initialRouteName: ROUTE_NAMES.HOME,
    tabBarPosition: 'bottom',
    optimizationsEnabled: true,
    animationEnabled: true,
    swipeEnabled: false,
    lazy: true,
    tabBarOptions: {
      showLabel: true,
      showIcon: true,
      style: {
        paddingBottom: isEqualsOrLargestThanIphoneX() ? 30 : 0,
        backgroundColor: appStyles.colors.white,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      indicatorStyle: {
        backgroundColor: 'transparent',
      },
      inactiveTintColor: appStyles.colors.gray,
      activeTintColor: appStyles.colors.primaryColor,
    },
  },
);

const AppContainer = createAppContainer(ApplicationTabs);

export default AppContainer;
