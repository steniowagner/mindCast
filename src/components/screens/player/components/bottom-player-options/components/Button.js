// @flow

import React from 'react';
import { TouchableOpacity } from 'react-native';

import appStyles from '~/styles';

type Props = {
  onPress: Function,
  children: Object,
};

const Button = ({ onPress, children }: Props): Object => (
  <TouchableOpacity
    onPress={onPress}
    hitSlop={{
      bottom: appStyles.metrics.smallSize,
      right: appStyles.metrics.smallSize,
      left: appStyles.metrics.smallSize,
      top: appStyles.metrics.smallSize,
    }}
  >
    {children}
  </TouchableOpacity>
);

export default Button;
