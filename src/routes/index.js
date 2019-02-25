import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import MainStack from './mainStack';

export const ROUTE_NAMES = {
  ONBOARDING_INTRO: 'ONBOARDING_INTRO',
  LOGIN: 'LOGIN',
  MAIN_STACK: 'MAIN_STACK',
};

const InitialStack = createSwitchNavigator(
  {
    [ROUTE_NAMES.MAIN_STACK]: {
      screen: MainStack,
    },
  },
  {
    initialRouteName: ROUTE_NAMES.MAIN_STACK,
  },
);

const AppContainer = createAppContainer(InitialStack);

export default AppContainer;
