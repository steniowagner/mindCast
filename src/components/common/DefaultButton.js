// @flow

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';

const ButtonWrapper = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  padding-vertical: ${({ translucent, theme }) => theme.metrics.mediumSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ translucent, theme }) => (translucent ? 'transparent' : theme.colors.primaryColor)};
  border: ${({ translucent, theme }) => (translucent ? theme.colors.textColor : 'transparent')}
    solid 1.5px;
  border-radius: 4.5px;
`;

const Title = styled(Text)`
  color: ${({ translucent, theme }) => (translucent ? theme.colors.textColor : theme.colors.white)};
  font-size: ${({ theme, size }) => (size === 'large'
    ? theme.metrics.largeSize
    : theme.metrics.mediumSize * 1.2)}px;
  font-family: CircularStd-Black;
`;

type Props = {
  translucent: ?boolean,
  onPress: Function,
  size: string,
  text: string,
};

const ListenNowButton = ({
  translucent,
  onPress,
  size,
  text,
}: Props): Object => (
  <ButtonWrapper
    translucent={translucent}
    onPress={onPress}
  >
    <Title
      translucent={translucent}
      size={size}
    >
      {text}
    </Title>
  </ButtonWrapper>
);

export default ListenNowButton;
