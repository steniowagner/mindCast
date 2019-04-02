// @flow

import React from 'react';
import { StatusBar, Platform } from 'react-native';

import {
  HeaderButton,
  POSITIONS,
} from '~/components/common/player/components/HeaderButton';
import HeaderActionButton from '~/components/common/HeaderActionButton';
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

export const getPlayerNavigationOption = (navigation: Object): Object => {
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

export const getDefaultNavigationWithTitle = (title: string): Object => ({
  ...DEFAULT_HEADER_STYLE,
  headerTransparent: false,
  headerStyle: {
    backgroundColor: appStyles.colors.dark,
    borderBottomWidth: 0,
    elevation: 0,
  },
  title,
});

export const getDefaultHeaderWithPlayButton = (
  navigation: Object,
  title: string,
): Object => {
  const { params } = navigation.state;

  const onPressHeaderButton = params && params[CONSTANTS.PARAMS.HEADER_PLAY_ACTION];

  return {
    ...getDefaultNavigationWithTitle(title),
    headerRight: <HeaderActionButton
      onPress={onPressHeaderButton}
    />,
  };
};

export const setHeaderPlayButtonPress = (
  playlist: Array<Object>,
  navigation: Object,
): void => {
  const onPressPlayHeaderButton = (): void => {
    if (playlist.length > 0) {
      navigation.navigate(CONSTANTS.ROUTES.PLAYER, {
        [CONSTANTS.PARAMS.PLAYER]: {
          [CONSTANTS.KEYS.PLAYLIST]: playlist,
        },
      });
    }
  };

  navigation.setParams({
    [CONSTANTS.PARAMS.HEADER_PLAY_ACTION]: onPressPlayHeaderButton,
  });
};
