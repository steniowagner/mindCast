import React from 'react';
import {
  HeaderButton,
  POSITIONS,
} from '~/components/common/player/components/HeaderButton';
import CONSTANTS from '~/utils/CONSTANTS';
import DEFAULT_HEADER_STYLE from './DEFAULT_HEADER_STYLE';

const getPlayerNavigationOption = (navigation: Object) => {
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

export default getPlayerNavigationOption;
