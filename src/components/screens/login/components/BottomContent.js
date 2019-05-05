// @flow

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components';

import Icon from '~/components/common/Icon';
import appStyles from '~/styles';

const Wrapper = styled(View)`
  width: 100%;
  margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('15%')};
`;

const ButtonWrapper = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('40%')};
  flex-direction: row;
  justify-content: center;
  padding-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
  border-radius: 5px;
  background-color: #fff;
`;

const ActionText = styled(Text)`
  margin-right: ${({ theme }) => theme.metrics.smallSize}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4.5%')}px;
  font-family: CircularStd-Bold;
  color: #111;
`;

const OrText = styled(Text)`
  margin-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4.5%')}px;
  font-family: CircularStd-Bold;
  color: ${({ theme }) => theme.colors.primaryColor};
`;

const Line = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('25%')};
  height: 1px;
  align-self: center;
  background-color: #fff;
`;

const LineWrapper = styled(View)`
  flex-direction: row;
  justify-content: center;
  margin-vertical: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const ButtonsWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

const renderButton = (iconColor, iconName, actionSelected): Object => (
  <ButtonWrapper>
    <ActionText>{`${actionSelected} with`}</ActionText>
    <Icon
      color={iconColor}
      name={iconName}
      size={20}
    />
  </ButtonWrapper>
);

type Props = {
  actionSelected: string,
};

const BottomContent = ({ actionSelected }: Props): Object => (
  <Wrapper>
    <LineWrapper>
      <Line />
      <OrText>OR</OrText>
      <Line />
    </LineWrapper>
    <ButtonsWrapper>
      {renderButton(appStyles.colors.facebook, 'facebook', actionSelected)}
      {renderButton(appStyles.colors.googlePlus, 'google-plus', actionSelected)}
    </ButtonsWrapper>
  </Wrapper>
);

export default BottomContent;
