// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

const Wrapper = styled(View)`
  width: 100%;
  margin-vertical: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

type Props = {
  children: Props,
};

const SectionWrapper = ({ children }: Props): Object => (
  <Wrapper>{children}</Wrapper>
);

export default SectionWrapper;
