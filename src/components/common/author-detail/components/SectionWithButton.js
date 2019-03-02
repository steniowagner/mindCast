// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import ListenNowButton from './ListenNowButton';
import SectionTitle from './SectionTitle';

const UpperContent = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: ${({ theme }) => theme.metrics.extraLargeSize}px;
  padding-right: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

type Props = {
  sectionTitle: string,
};

const SectionWithButton = ({ sectionTitle }: Props): Object => (
  <UpperContent>
    <SectionTitle
      title={sectionTitle}
    />
    <ListenNowButton />
  </UpperContent>
);

export default SectionWithButton;
