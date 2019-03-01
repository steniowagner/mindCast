// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import FeaturedListItem from './FeaturedListItem';
import SectionTitel from '../SectionTitle';

const Wrapper = styled(View)`
  width: 100%;
`;

const Featured = (): Object => (
  <Wrapper>
    <SectionTitel
      title="Featured"
    />
    <FeaturedListItem />
  </Wrapper>
);

export default Featured;
