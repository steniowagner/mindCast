// @flow

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styled, { withTheme } from 'styled-components';

import Icon from '~/components/common/Icon';
import appStyles from '~/styles';

const Container = styled(TouchableOpacity)`
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
  color: ${({ theme }) => theme.colors.textColor};
`;

type Props = {
  onPressItem: Function,
  iconName: string,
  title: string,
  theme: Object,
};

const SectionItem = ({
  onPressItem,
  iconName,
  title,
  theme,
}: Props): Object => (
  <Container
    onPress={onPressItem}
  >
    <LeftContentWrapper>
      <Icon
        color={theme.colors.primaryColor}
        name={iconName}
        size={24}
      />
      <OptionTitle>{title}</OptionTitle>
    </LeftContentWrapper>
    <Icon
      color={theme.colors.textColor}
      name="chevron-right"
      size={28}
    />
  </Container>
);

export default withTheme(SectionItem);
