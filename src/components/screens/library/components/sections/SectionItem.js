// @flow

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components';

import Icon from '~/components/common/Icon';
import appStyles from '~/styles';

const Container = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const LeftContentWrapper = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const OptionTitle = styled(Text)`
  margin-left: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.white};
`;

type Props = {
  onPressItem: Function,
  iconName: string,
  title: string,
};

const SectionItem = ({ onPressItem, iconName, title }: Props): Object => (
  <Container>
    <LeftContentWrapper>
      <Icon
        color={appStyles.colors.primaryColor}
        name={iconName}
        size={24}
      />
      <OptionTitle>{title}</OptionTitle>
    </LeftContentWrapper>
    <TouchableOpacity
      onPress={onPressItem}
      hitSlop={{
        bottom: appStyles.metrics.smallSize,
        right: appStyles.metrics.smallSize,
        left: appStyles.metrics.smallSize,
        top: appStyles.metrics.smallSize,
      }}
    >
      <Icon
        color={appStyles.colors.subTextWhite}
        name="chevron-right"
        size={28}
      />
    </TouchableOpacity>
  </Container>
);

export default SectionItem;
