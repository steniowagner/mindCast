// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import RelatedAuthorsListItem from './RelatedAuthorsListItem';
import SectionTitle from '../SectionTitle';

const Wrapper = styled(View)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize * 2}px;
`;

const RelatedAuthors = (): Object => (
  <Wrapper>
    <SectionTitle
      title="Related Authors"
    />
    <RelatedAuthorsListItem />
  </Wrapper>
);

export default RelatedAuthors;
