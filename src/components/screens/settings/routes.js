import { createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import CONSTANST from '~/utils/CONSTANTS';

import Settings from './Settings';

const RootStack = createStackNavigator(
  {
    [CONSTANST.ROUTES.SETTINGS]: {
      screen: Settings,
      navigationOptions: () => ({
        headerBackTitle: null,
        header: null,
      }),
    },
  },
  {
    initialRouteName: CONSTANST.ROUTES.SETTINGS,
    mode: Platform.OS === 'ios' ? 'card' : 'modal',
    headerLayoutPreset: 'center',
    headerMode: 'screen',
  },
);

export default RootStack;
