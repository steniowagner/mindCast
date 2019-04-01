import { StatusBar, Platform } from 'react-native';
import appStyles from '~/styles';

const DEFAULT_HEADER_STYLE = {
  headerBackTitle: null,
  headerTintColor: appStyles.colors.white,
  headerTransparent: true,
  headerStyle: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  titleStyle: {
    color: appStyles.colors.white,
  },
  headerTitleStyle: {
    fontFamily: 'CircularStd-Medium',
    fontSize: appStyles.metrics.extraLargeSize,
  },
};

export default DEFAULT_HEADER_STYLE;
