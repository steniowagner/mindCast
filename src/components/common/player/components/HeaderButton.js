// @flow

import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';

import Icon from '~/components/common/Icon';
import appStyles from '~/styles';

type Props = {
  onPress: Function,
  iconName: string,
  position: string,
};

export const POSITIONS = {
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
};

export const HeaderButton = ({
  onPress,
  position,
  iconName,
}: Props): Object => {
  const isRightPositioned = position === POSITIONS.RIGHT;
  const isLeftPositioned = position === POSITIONS.LEFT;
  const marginValue = Platform.OS === 'android' ? 16 : 14;

  const marginRight = isRightPositioned ? marginValue : 0;
  const marginLeft = isLeftPositioned ? marginValue : 0;

  return (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={{
        bottom: appStyles.metrics.smallSize,
        right: appStyles.metrics.smallSize,
        left: appStyles.metrics.smallSize,
        top: appStyles.metrics.smallSize,
      }}
      style={{
        paddingTop: appStyles.metrics.extraSmallSize,
        marginRight,
        marginLeft,
      }}
    >
      <Icon
        color={appStyles.colors.white}
        name={iconName}
        size={26}
      />
    </TouchableOpacity>
  );
};
