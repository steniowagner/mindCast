// @flow

import React from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import appStyles from '~/styles';

type Props = {
  color: ?string,
  name: string,
  size: number,
};

const Icon = ({ color, name, size }: Props) => (
  <MaterialCommunityIcons
    color={color || appStyles.colors.white}
    name={name}
    size={size}
  />
);

export default Icon;
