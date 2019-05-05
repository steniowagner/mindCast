// @flow

import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import DefaultText from './DefaultText';
import appStyles from '~/styles';

const Wrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('30%')}px;
  justify-content: center;
  align-items: center;
`;

const AppTitle = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
  font-family: CircularStd-Black;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;

const SloganWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const SloganText = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4.5%')}px;
  font-family: CircularStd-Bold;
  color: ${({ color }) => color};
  text-align: center;
`;

const Header = (): Object => (
  <Wrapper>
    <AppTitle>MINDCAST</AppTitle>
    <SloganWrapper>
      <DefaultText
        color={appStyles.colors.white}
        text="A new way to boost your"
      />
      <DefaultText
        color={appStyles.colors.primaryColor}
        text=" knowledge."
      />
    </SloganWrapper>
  </Wrapper>
);

export default Header;
