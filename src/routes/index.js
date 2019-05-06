import React from 'react';

import {
  createSwitchNavigator,
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';
import { withTheme } from 'styled-components';

import OboardingIntro from '~/components/screens/oboarding-intro/OnboardingIntro';
import { getDefaultHeaderWithButton } from './utils/navigationOptions';
import Interests from '~/components/screens/interests/Interests';
import StarterScreen from '~/components/screens/StaterScreen';
import Login from '~/components/screens/login/Login';
import CONSTANTS from '../utils/CONSTANTS';
import MainStack from './mainStack';

const InterestsScreen = createStackNavigator(
  {
    [CONSTANTS.ROUTES.INTERESTS]: {
      screen: Interests,
      navigationOptions: ({ navigation, screenProps }) => getDefaultHeaderWithButton(
        navigation,
        screenProps,
        'Your Interests',
        'check-all',
      ),
    },
  },
  {
    headerLayoutPreset: 'center',
  },
);

const InitialStack = createSwitchNavigator(
  {
    [CONSTANTS.ROUTES.STARTER_SCREEN]: {
      screen: StarterScreen,
    },

    [CONSTANTS.ROUTES.ONBOARDING_INTRO]: {
      screen: OboardingIntro,
    },

    [CONSTANTS.ROUTES.LOGIN]: {
      screen: Login,
    },

    [CONSTANTS.ROUTES.INTERESTS]: InterestsScreen,

    [CONSTANTS.ROUTES.MAIN_STACK]: {
      screen: MainStack,
    },
  },
  {
    initialRouteName: CONSTANTS.ROUTES.STARTER_SCREEN,
  },
);

const AppContainer = createAppContainer(InitialStack);

export default withTheme(({ theme }) => (
  <AppContainer
    screenProps={{ theme }}
  />
));
