// @flow

import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import Icon from '~/components/common/Icon';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
`;

const ContentWrapper = styled(View)`
  justify-content: center;
  align-items: center;
  margin-top: -${({ theme }) => theme.metrics.extraLargeSize * 1.2}px;
`;

const Title = styled(Text).attrs({
  numberOfLines: 1,
})`
  font-size: ${({ theme }) => theme.metrics.extraLargeSize * 1.4}px;
  color: ${({ theme }) => theme.colors.textColor};
  font-family: CircularStd-Black;
  text-align: center;
`;

const Message = styled(Text).attrs({
  numberOfLines: 3,
})`
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize * 1.1}px;
  color: ${({ theme }) => theme.colors.subTextColor};
  font-family: CircularStd-Medium;
  text-align: center;
`;

type Props = {
  message: string,
  title: string,
  icon: string,
};

const ErrorMessage = ({ message, title, icon }: Props): Object => (
  <Wrapper>
    <ContentWrapper>
      <Icon
        name={icon}
        size={150}
      />
      <Title>{title}</Title>
      <Message>{message}</Message>
    </ContentWrapper>
  </Wrapper>
);

export default ErrorMessage;
