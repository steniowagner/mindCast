// @flow

import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';

const TextStyle = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4.5%')}px;
  font-family: CircularStd-Bold;
  color: ${({ color }) => color};
  text-align: center;
`;

type Props = {
  color: string,
  text: string,
};

const DefaultText = ({ color, text }: Props): Object => (
  <TextStyle
    color={color}
  >
    {text}
  </TextStyle>
);

export default DefaultText;
