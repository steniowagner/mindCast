// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

const Wrapper = styled(View)`
  width: 100%;
  margin-vertical: ${({ theme }) => theme.metrics.extraLargeSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
`;

type Props = {
  children: Object,
};

const SectionWrapper = ({ children }: Props): Object => (
  <Wrapper>{children}</Wrapper>
);

export default SectionWrapper;
