// @flow

import React, { Fragment } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components';

import Icon from '~/components/common/Icon';
import DefaultText from './DefaultText';
import appStyles from '~/styles';

const Wrapper = styled(View)`
  width: 100%;
  align-self: flex-end;
`;

const ButtonWrapper = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ withMarginBottom, theme }) => (withMarginBottom ? theme.metrics.largeSize : 0)}px;
  padding-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
  border-radius: 5px;
  background-color: ${({ backgroundColor }) => backgroundColor};
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
  justify-content: flex-end;
  align-items: flex-end;
`;

type RenderButtonProps = {
  withMarginBottom: boolean,
  backgroundColor: string,
  actionSelected: string,
  onPress: Function,
  iconName: string,
  size: number,
};

const renderButton = ({
  withMarginBottom,
  backgroundColor,
  actionSelected,
  iconName,
  onPress,
  size,
}: RenderButtonProps): Object => (
  <ButtonWrapper
    withMarginBottom={withMarginBottom}
    backgroundColor={backgroundColor}
    onPress={onPress}
  >
    <DefaultText
      text={`${actionSelected} with`}
      color={appStyles.colors.white}
      withMarginRight
    />
    <Icon
      color={appStyles.colors.white}
      name={iconName}
      size={size}
    />
  </ButtonWrapper>
);

type Props = {
  onNavigateToMainStack: Function,
  actionSelected: string,
};

const BottomContent = ({
  actionSelected,
  onNavigateToMainStack,
}: Props): Object => (
  <Wrapper>
    <LineWrapper>
      <Line />
      <OrText>OR</OrText>
      <Line />
    </LineWrapper>
    <ButtonsWrapper>
      {renderButton({
        backgroundColor: appStyles.colors.facebook,
        onPress: onNavigateToMainStack,
        withMarginBottom: true,
        iconName: 'facebook-box',
        actionSelected,
        size: 25,
      })}
      {renderButton({
        backgroundColor: appStyles.colors.googlePlus,
        onPress: onNavigateToMainStack,
        withMarginBottom: true,
        iconName: 'google-plus-box',
        actionSelected,
        size: 30,
      })}
    </ButtonsWrapper>
  </Wrapper>
);

export default BottomContent;
