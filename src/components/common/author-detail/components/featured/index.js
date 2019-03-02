// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import SectionWithButton from '../SectionWithButton';
import FeaturedListItem from './FeaturedListItem';

const Wrapper = styled(View)`
  width: 100%;
  margin-vertical: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const ItemsWrapper = styled(View)`
  margin-left: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const featured = Array(5).fill(<FeaturedListItem />);

const Featured = (): Object => (
  <Wrapper>
    <SectionWithButton
      sectionTitle="Featured"
    />
    <ItemsWrapper>{featured.map(Item => Item)}</ItemsWrapper>
  </Wrapper>
);

export default Featured;
