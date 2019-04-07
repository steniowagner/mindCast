// @flow

import React from 'react';
import { Platform, Switch } from 'react-native';
import appStyles from '~/styles';

type Props = {
  onToggle: Function,
  value: boolean,
};

const CustomSwitch = ({ onToggle, value }: Props): Object => {
  const thumbTintColor = value
    ? appStyles.colors.primaryColor
    : appStyles.colors.white;

  const trackColor = {
    true:
      Platform.OS === 'android'
        ? appStyles.colors.primaryColorAlpha
        : appStyles.colors.primaryColor,
    false: Platform.OS === 'android' ? appStyles.colors.subTextWhite : '',
  };

  return (
    <Switch
      thumbColor={Platform.OS === 'android' ? thumbTintColor : ''}
      onValueChange={onToggle}
      trackColor={trackColor}
      value={value}
    />
  );
};

export default CustomSwitch;
