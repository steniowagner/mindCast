// @flow

import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';

import Icon from '~/components/common/Icon';
import appStyles from '~/styles';

type Props = {
  onPress: Function,
};

const HeaderRightButton = ({ onPress }: Props): Object => (
  <TouchableOpacity
    onPress={onPress}
    hitSlop={{
      bottom: appStyles.metrics.smallSize,
      right: appStyles.metrics.smallSize,
      left: appStyles.metrics.smallSize,
      top: appStyles.metrics.smallSize,
    }}
    style={{
      marginRight: Platform.OS === 'android' ? 16 : 14,
    }}
  >
    <Icon
      name="format-list-bulleted"
      size={24}
    />
  </TouchableOpacity>
);

export default HeaderRightButton;
