// @flow

import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

import Icon from '~/components/common/Icon';
import appStyles from '~/styles';

const Wrapper = styled(View)`
  justify-content: center;
  align-items: center;
  padding-top: 3px;
  margin-right: ${({ theme }) => theme.metrics.largeSize}px;
`;

type Props = {
  onPress: Function,
};

const HeaderActionButton = ({ onPress }: Props): Object => (
  <Wrapper>
    <TouchableOpacity
      onPress={onPress}
      hitSlop={{
        bottom: appStyles.metrics.smallSize,
        right: appStyles.metrics.smallSize,
        left: appStyles.metrics.smallSize,
        top: appStyles.metrics.smallSize,
      }}
    >
      <Icon
        color={appStyles.colors.primaryColor}
        name="play-circle-outline"
        size={26}
      />
    </TouchableOpacity>
  </Wrapper>
);

export default HeaderActionButton;
