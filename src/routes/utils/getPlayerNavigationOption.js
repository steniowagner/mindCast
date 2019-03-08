import React from 'react';
import {
  HeaderButton,
  POSITIONS,
} from '~/components/common/player/components/HeaderButton';
import CONSTANTS from '~/utils/CONSTANTS';
import DEFAULT_HEADER_STYLE from './DEFAULT_HEADER_STYLE';

const getPlayerNavigationOption = (navigation: Object) => {
  const { state } = navigation;
  const { params } = navigation.state;

  const isRightMenuOpen = params[CONSTANTS.IS_PLAYER_RIGHT_MENU_OPEN];
  const title = params[CONSTANTS.PLAYER_TITLE_PARAM];

  return {
    header: isRightMenuOpen ? null : undefined,
    title: title ? `#${title}` : '',
    headerRight: (
      <HeaderButton
        onPress={() => {
          const onPressHeaderRightButton = state.params[CONSTANTS.HEADER_BUTTON_RIGHT_PLAYER_ACTION];
          onPressHeaderRightButton();
        }}
        iconName="format-list-bulleted"
        position={POSITIONS.RIGHT}
      />
    ),
    ...DEFAULT_HEADER_STYLE,
  };
};

export default getPlayerNavigationOption;
