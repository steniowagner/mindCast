import { createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import Settings from './Settings';

export const ROUTE_NAMES = {
  SETTINGS: 'SETTINGS',
};

const RootStack = createStackNavigator(
  {
    [ROUTE_NAMES.SETTINGS]: {
      screen: Settings,
      navigationOptions: () => ({
        headerBackTitle: null,
        header: null,
      }),
    },
  },
  {
    initialRouteName: ROUTE_NAMES.SETTINGS,
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
