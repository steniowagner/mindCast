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

export default DEFAULT_HEADER_STYLE;
