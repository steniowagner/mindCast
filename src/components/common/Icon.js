// @flow

import React from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { withTheme } from 'styled-components';

type Props = {
  color: ?string,
  theme: Object,
  name: string,
  size: number,
};

const Icon = ({
  theme, color, name, size,
}: Props) => (
  <MaterialCommunityIcons
    color={color || theme.colors.textColor}
    name={name}
    size={size}
  />
);

export default withTheme(Icon);
