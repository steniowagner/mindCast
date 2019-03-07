// @flow

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';

const ButtonWrapper = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  padding-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
  border-radius: 3px;
`;

const Title = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme, size }) => (size === 'large' ? theme.metrics.largeSize : theme.metrics.mediumSize)}px;
  font-family: CircularStd-Black;
`;

type Props = {
  onPress: Function,
  size: string,
  text: string,
};

const ListenNowButton = ({ onPress, size, text }: Props): Object => (
  <ButtonWrapper
    onPress={onPress}
  >
    <Title
      size={size}
    >
      {text}
    </Title>
  </ButtonWrapper>
);

export default ListenNowButton;
