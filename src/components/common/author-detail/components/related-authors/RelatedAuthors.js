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

type RelatedAuthorProps = {
  profileImage: string,
  name: string,
  id: string,
};

type Props = {
  relatedAuthors: Array<RelatedAuthorProps>,
};

const RelatedAuthors = ({ relatedAuthors }: Props): Object => (
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
      data={relatedAuthors}
      keyExtractor={podcast => `${podcast.id}`}
      renderItem={({ item }) => (
        <RelatedAuthorsListItem
          profileImage={item.profileImage}
          name={item.name}
          id={item.id}
        />
      )}
    />
  </Wrapper>
);

export default RelatedAuthors;
