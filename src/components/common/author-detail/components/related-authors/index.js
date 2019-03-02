// @flow

import React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import RelatedAuthorsListItem from './RelatedAuthorsListItem';
import SectionTitle from '../SectionTitle';

const Wrapper = styled(View)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize * 2}px;
  margin-vertical: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const UpperContent = styled(View)`
  width: 100%;
  padding-left: ${({ theme }) => theme.metrics.largeSize}px;
`;

const RelatedAuthorsList = styled(FlatList)`
  width: 100%;
  padding-left: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const ListFooterComponent = styled(View)`
  width: ${({ theme }) => theme.metrics.extraLargeSize}px;
  height: 1px;
`;

const items = Array(5).fill(<RelatedAuthorsListItem />);

const RelatedAuthors = (): Object => (
  <Wrapper>
    <UpperContent>
      <SectionTitle
        title="Related Authors"
      />
    </UpperContent>
    <RelatedAuthorsList
      ListFooterComponent={ListFooterComponent}
      showsHorizontalScrollIndicator={false}
      horizontal
      data={items}
      renderItem={({ item }) => item}
    />
  </Wrapper>
);

export default RelatedAuthors;
