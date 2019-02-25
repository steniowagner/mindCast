// @flow

import { Dimensions, Platform } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const IPHONEX_WIDTH = 375;
const IPHONEX_HEIGHT = 812;

const isEqualsOrLargestThanIphoneX = (): boolean => {
  const isEqualsOrLargestThanIphoneXInPortraitMode = screenHeight >= IPHONEX_HEIGHT && screenWidth >= IPHONEX_WIDTH;
  const isEqualsOrLargestThanIphoneXInLandscapeMode = screenHeight >= IPHONEX_WIDTH && screenWidth >= IPHONEX_HEIGHT;

  return (
    Platform.OS === 'ios'
    && (isEqualsOrLargestThanIphoneXInPortraitMode
      || isEqualsOrLargestThanIphoneXInLandscapeMode)
  );
};

export default isEqualsOrLargestThanIphoneX;
