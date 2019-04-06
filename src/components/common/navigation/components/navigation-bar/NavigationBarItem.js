// @flow

import React from 'react';
import {
  TouchableOpacity, Platform, Text, View,
} from 'react-native';
import styled from 'styled-components';

import Icon from '~/components/common/Icon';

const Wrapper = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('25%')}px;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const ItemText = styled(Text)`
  margin-top: ${({ theme }) => (Platform.OS === 'android' ? theme.metrics.extraSmallSize : 0)}px;
  font-family: CircularStd-Book;
  color: ${({ isSelected, theme }) => (isSelected ? theme.colors.primaryColor : theme.colors.subTextWhite)};
  font-size: ${({ theme }) => theme.metrics.mediumSize};
`;

const ItemIcon = styled(Icon).attrs(({ isSelected, theme, icon }) => ({
  color: isSelected ? theme.colors.primaryColor : theme.colors.subTextWhite,
  name: icon,
  size: 24,
}))``;

type Props = {
  onPressItem: Function,
  isSelected: boolean,
  label: string,
  icon: string,
};

const NavigationBarItem = ({
  onPressItem,
  isSelected,
  label,
  icon,
}: Props): Object => (
  <Wrapper
    onPress={onPressItem}
  >
    <ItemIcon
      isSelected={isSelected}
      label={label}
      icon={icon}
    />
    <ItemText
      isSelected={isSelected}
    >
      {label}
    </ItemText>
  </Wrapper>
);

export default NavigationBarItem;
