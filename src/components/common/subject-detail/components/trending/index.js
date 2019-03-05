// @flow

import React from 'react';
import { ScrollView, View, FlatList } from 'react-native';
import styled from 'styled-components';

import TrendingListItem from './TrendingListItem';
import appStyles from '~/styles';

type Props = {
  podcasts: Array<Object>,
};

const ListsWrapper = styled(View)`
  height: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const renderList = (podcasts: Array<Object>, side: string): Object => (
  <FlatList
    showsVerticalScrollIndicator={false}
    keyExtractor={item => `${item.id}`}
    data={podcasts}
    style={{
      flex: 1,
      paddingLeft: side === 'right' ? appStyles.metrics.smallSize : 0,
      paddingRight: side === 'left' ? appStyles.metrics.smallSize : 0,
    }}
    renderItem={({ item, index }) => (
      <TrendingListItem
        datasetLength={podcasts.length}
        podcastImage={item.imageURL}
        author={item.author}
        title={item.title}
        index={index}
        side={side}
      />
    )}
  />
);

const TrendingPodcastsList = ({ podcasts }: Props): Object => {
  const middleIndex = Math.floor(podcasts.length / 2);
  const rightDataset = podcasts.slice(0, middleIndex);
  const leftDataset = podcasts.slice(middleIndex, podcasts.length);

  return (
    <ScrollView
      contentContainerStyle={{
        marginHorizontal: appStyles.metrics.mediumSize,
      }}
      showsVerticalScrollIndicator={false}
      style={{
        height: '100%',
      }}
    >
      <ListsWrapper>
        {renderList(leftDataset, 'left')}
        {renderList(rightDataset, 'right')}
      </ListsWrapper>
    </ScrollView>
  );
};

export default TrendingPodcastsList;
