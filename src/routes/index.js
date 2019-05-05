import React from 'react';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { withTheme } from 'styled-components';

import OboardingIntro from '~/components/screens/oboarding-intro/OnboardingIntro';
import Login from '~/components/screens/login/Login';
import CONSTANTS from '../utils/CONSTANTS';
import MainStack from './mainStack';

export const ROUTE_NAMES = {
  ONBOARDING_INTRO: 'ONBOARDING_INTRO',
};

const InitialStack = createSwitchNavigator(
  {
    [ROUTE_NAMES.ONBOARDING_INTRO]: {
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
    initialRouteName: ROUTE_NAMES.ONBOARDING_INTRO,
  },
);

const AppContainer = createAppContainer(InitialStack);

export default withTheme(({ theme }) => (
  <AppContainer
    screenProps={{ theme }}
  />
));
