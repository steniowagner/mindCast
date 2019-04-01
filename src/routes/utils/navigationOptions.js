import React from 'react';
import { StatusBar, Platform } from 'react-native';

import {
  HeaderButton,
  POSITIONS,
} from '~/components/common/player/components/HeaderButton';
import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

export const DEFAULT_HEADER_STYLE = {
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

export const getPlayerNavigationOption = (navigation: Object) => {
  const { params } = navigation.state;

  const onPressHeaderRightButton = params[CONSTANTS.PARAMS.HEADER_BUTTON_RIGHT_PLAYER_ACTION];
  const isRightMenuOpen = params[CONSTANTS.KEYS.IS_PLAYER_RIGHT_MENU_OPEN];
  const title = params[CONSTANTS.PARAMS.PLAYER_TITLE];

  return {
    header: isRightMenuOpen ? null : undefined,
    title: title ? `#${title}` : '',
    headerRight: (
      <HeaderButton
        onPress={onPressHeaderRightButton}
        iconName="format-list-bulleted"
        position={POSITIONS.RIGHT}
      />
    ),
    ...DEFAULT_HEADER_STYLE,
  };
};

export const getDefaultNavigationWithTitle = title => ({
  ...DEFAULT_HEADER_STYLE,
  headerTransparent: false,
  headerStyle: {
    backgroundColor: appStyles.colors.dark,
    borderBottomWidth: 0,
    elevation: 0,
  },
  title,
});
