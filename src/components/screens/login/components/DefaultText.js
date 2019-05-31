// @flow

import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';

const TextStyle = styled(Text)`
  margin-right: ${({ withMarginRight, theme }) => (withMarginRight ? theme.metrics.smallSize : 0)}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4.5%')}px;
  font-family: CircularStd-Bold;
  color: ${({ color }) => color};
  text-align: center;
`;

type Props = {
  withMarginRight: ?boolean,
  color: string,
  text: string,
};

const DefaultText = ({ withMarginRight, color, text }: Props): Object => (
  <TextStyle
    withMarginRight={withMarginRight}
    color={color}
  >
    {text}
  </TextStyle>
);

export default DefaultText;
