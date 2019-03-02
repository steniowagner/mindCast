// @flow

import React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import RelatedAuthorsListItem from './RelatedAuthorsListItem';
import SectionTitle from '../SectionTitle';

const Wrapper = styled(View)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.metrics.getHeightFromDP('10%')}px;
`;

const items = Array(5).fill(<RelatedAuthorsListItem />);

const RelatedAuthors = (): Object => (
  <Wrapper>
    <SectionTitle
      title="Related Authors"
    />
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      data={items}
      renderItem={({ item }) => item}
    />
  </Wrapper>
);

export default RelatedAuthors;
