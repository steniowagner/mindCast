// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import FeaturedListItem from './FeaturedListItem';
import SectionTitel from '../SectionTitle';

const Wrapper = styled(View)`
  width: 100%;
`;

const featured = Array(5).fill(<FeaturedListItem />);

const Featured = (): Object => (
  <Wrapper>
    <SectionTitel
      title="Featured"
    />
    {featured.map(Item => Item)}
  </Wrapper>
);

export default Featured;
