import React from 'react';
import {
  HeaderButton,
  POSITIONS,
} from '~/components/common/player/components/HeaderButton';
import CONSTANTS from '~/utils/CONSTANTS';
import DEFAULT_HEADER_STYLE from './DEFAULT_HEADER_STYLE';

const getPlayerNavigationOption = (navigation: Object) => {
  const { state } = navigation;

  const isRightMenuOpen = state.params[CONSTANTS.IS_PLAYER_RIGHT_MENU_OPEN];
  const { subject } = state.params[CONSTANTS.PLAYER_PARAMS];

  return {
    header: isRightMenuOpen ? null : undefined,
    title: `#${subject}`,
    headerRight: (
      <HeaderButton
        onPress={() => {
          if (isNavigationParamsDefined) {
            const onPressHeaderRightButton = state.params[CONSTANTS.HEADER_BUTTON_RIGHT_PLAYER_ACTION];

            onPressHeaderRightButton();
          }
        }}
        iconName="format-list-bulleted"
        position={POSITIONS.RIGHT}
      />
    ),
    ...DEFAULT_HEADER_STYLE,
  };
};

export default getPlayerNavigationOption;
