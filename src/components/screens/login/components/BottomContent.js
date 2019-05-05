// @flow

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components';

import Icon from '~/components/common/Icon';
import DefaultText from './DefaultText';
import appStyles from '~/styles';

const Wrapper = styled(View)`
  width: 100%;
  align-self: flex-end;
  margin-bottom: ${({ theme }) => 2 * theme.metrics.extraLargeSize}px;
`;

const ButtonWrapper = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('42%')};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
  border-radius: 5px;
  background-color: #fff;
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

const GapSpace = styled(View)`
  width: ${({ theme }) => theme.metrics.extraSmallSize}px;
  height: 1px;
`;

const renderButton = (
  onNavigateToMainStack,
  iconColor,
  iconName,
  actionSelected,
  size,
  withGap,
): Object => (
  <ButtonWrapper
    onPress={onNavigateToMainStack}
  >
    <DefaultText
      text={`${actionSelected} with`}
      color={appStyles.colors.darkText}
    />
    {withGap && <GapSpace />}
    <Icon
      color={iconColor}
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
      {renderButton(
        onNavigateToMainStack,
        appStyles.colors.facebook,
        'facebook',
        actionSelected,
        20,
      )}
      {renderButton(
        onNavigateToMainStack,
        appStyles.colors.googlePlus,
        'google-plus',
        actionSelected,
        24,
        true,
      )}
    </ButtonsWrapper>
  </Wrapper>
);

export default BottomContent;
