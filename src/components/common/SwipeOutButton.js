// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import Icon from '~/components/common/Icon';
import appStyles from '~/styles';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color};
`;

type Props = {
  color: string,
  icon: string,
};

const SwipeOutButton = ({ color, icon }: Props): Object => (
  <Wrapper
    color={color}
  >
    <Icon
      color={appStyles.colors.white}
      name={icon}
      size={25}
    />
  </Wrapper>
);

export default SwipeOutButton;
