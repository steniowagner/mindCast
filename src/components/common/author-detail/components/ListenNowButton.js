// @flow

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';

const ButtonWrapper = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
  border-radius: 3px;
`;

const ListenNowText = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Black;
`;

const ListenNowButton = (): Object => (
  <ButtonWrapper>
    <ListenNowText>LISTEN NOW</ListenNowText>
  </ButtonWrapper>
);

export default ListenNowButton;
