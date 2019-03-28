// @flow

import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

const Wrapper = styled(View)`
  margin-left: ${({ theme }) => theme.metrics.largeSize}px;
`;

const Title = styled(Text)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize * 1.2}px;
  font-family: CircularStd-Bold;
  color: ${({ theme }) => theme.colors.white};
`;

const Line = styled(View)`
  height: ${({ theme }) => theme.metrics.getHeightFromDP('0.5%')}px;
  width: ${({ theme }) => theme.metrics.extraLargeSize * 2}px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
`;

type Props = {
  title: string,
};

const SectionTitle = ({ title }: Props): Object => (
  <Wrapper>
    <Title>{title}</Title>
    <Line />
  </Wrapper>
);

export default SectionTitle;
