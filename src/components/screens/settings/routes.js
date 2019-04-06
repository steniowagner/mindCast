import { createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import { getPlayerNavigationOption } from '~/routes/utils/navigationOptions';
import Player from '~/components/common/player/PlayerContainer';
import CONSTANTS from '~/utils/CONSTANTS';

import Settings from './Settings';

const RootStack = createStackNavigator(
  {
    [CONSTANTS.ROUTES.SETTINGS]: {
      screen: Settings,
      navigationOptions: () => ({
        headerBackTitle: null,
        header: null,
      }),
    },

    [CONSTANTS.ROUTES.PLAYER]: {
      screen: Player,
      navigationOptions: ({ navigation }) => getPlayerNavigationOption(navigation),
    },
  },
  {
    initialRouteName: CONSTANTS.ROUTES.SETTINGS,
    mode: Platform.OS === 'ios' ? 'card' : 'modal',
    headerLayoutPreset: 'center',
    headerMode: 'screen',
  },
);

export default RootStack;
