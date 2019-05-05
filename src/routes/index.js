import React from 'react';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { withTheme } from 'styled-components';

import OboardingIntro from '~/components/screens/oboarding-intro/OnboardingIntro';
import StarterScreen from '~/components/screens/StaterScreen';
import Login from '~/components/screens/login/Login';
import CONSTANTS from '../utils/CONSTANTS';
import MainStack from './mainStack';

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
