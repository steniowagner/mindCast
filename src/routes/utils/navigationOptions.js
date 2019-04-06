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
    fontSize: appStyles.metrics.navigationHeaderFontSize,
  },
};

export const getPlayerNavigationOption = (navigation: Object): Object => {
  const { params } = navigation.state;

  const onPressHeaderRightButton = params[CONSTANTS.PARAMS.HEADER_BUTTON_RIGHT_PLAYER_ACTION];
  const isRightMenuOpen = params[CONSTANTS.KEYS.IS_PLAYER_RIGHT_MENU_OPEN];
  const title = params[CONSTANTS.PARAMS.PLAYER_TITLE];

  return {
    ...DEFAULT_HEADER_STYLE,
    headerStyle: {
      marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      backgroundColor: 'transparent',
      borderBottomWidth: 0,
    },
    header: isRightMenuOpen ? null : undefined,
    title: title ? `#${title}` : '',
    headerRight: (
      <HeaderButton
        onPress={onPressHeaderRightButton}
        iconName="format-list-bulleted"
        position={POSITIONS.RIGHT}
      />
    ),
  };
};

export const getDefaultNavigationWithTitle = (
  title: string,
  navigation: Object,
  screenProps: Object,
): Object => {
  const { params } = navigation.state;
  const { theme } = screenProps;

  return {
    ...DEFAULT_HEADER_STYLE,
    headerTintColor: theme.colors.textColor,
    titleStyle: {
      color: theme.colors.textColor,
    },
    headerTransparent: false,
    headerStyle: {
      backgroundColor: theme.colors.secondaryColor,
      marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      borderBottomWidth: 0,
      elevation: 0,
    },
    title,
  };
};

export const getDefaultHeaderWithButton = (
  navigation: Object,
  screenProps: Object,
  title: string,
  icon: string,
): Object => {
  const { params } = navigation.state;
  const { theme } = screenProps;

  const onPressHeaderButton = params && params[CONSTANTS.PARAMS.HEADER_ACTION];
  const headerWithTitleStyle = getDefaultNavigationWithTitle(
    title,
    navigation,
    screenProps,
  );

  return {
    ...headerWithTitleStyle,
    ...Platform.select({
      android: {
        headerStyle: {
          ...headerWithTitleStyle.headerStyle,
          marginTop: StatusBar.currentHeight,
        },
      },
    }),
    headerRight: (
      <HeaderActionButton
        color={theme.colors.textColor}
        onPress={onPressHeaderButton}
        icon={icon}
      />
    ),
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
    [CONSTANTS.PARAMS.HEADER_ACTION]: onPressPlayHeaderButton,
  });
};

export const getHiddenHeaderLayout = (screenProps: Object): Object => {
  const { theme } = screenProps;

  return {
    ...DEFAULT_HEADER_STYLE,
    headerTintColor: theme.colors.textColor,
    headerBackTitle: null,
    ...Platform.select({
      android: {
        headerStyle: {
          marginTop: StatusBar.currentHeight,
        },
      },
    }),
  };
};
