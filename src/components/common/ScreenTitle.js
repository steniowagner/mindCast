// @flow

import React from 'react';
import { Platform, Text } from 'react-native';
import styled from 'styled-components';

const Title = styled(Text)`
  width: 100%;
  margin-top: ${({ theme }) => {
    const percentage = Platform.OS === 'android' ? '8%' : '15%';
    return theme.metrics.getWidthFromDP(percentage);
  }}px;
  margin-left: ${({ theme }) => theme.metrics.largeSize}px;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize * 1.7}px;
  font-family: CircularStd-Black;
  color: ${({ theme }) => theme.colors.textColor};
`;

type Props = {
  title: string,
};

const ScreenTitle = ({ title }: Props) => <Title>{title}</Title>;

export default ScreenTitle;
