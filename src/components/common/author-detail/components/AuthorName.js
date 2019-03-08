// @flow

import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

const Wrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('30%')};
  justify-content: flex-end;
  padding-right: ${({ theme }) => theme.metrics.getWidthFromDP('50%')}px;
`;

const Name = styled(Text)`
  font-family: CircularStd-Black;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
  color: ${({ theme }) => theme.colors.white};
`;

type Props = {
  name: string,
};

const AuthorName = ({ name }: Props) => (
  <Wrapper>
    <Name>{name}</Name>
  </Wrapper>
);

export default AuthorName;
