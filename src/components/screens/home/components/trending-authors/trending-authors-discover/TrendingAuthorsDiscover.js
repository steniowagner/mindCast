// @flow

import React from 'react';
import { FlatList, Platform, View } from 'react-native';
import styled from 'styled-components';

import TrendingAuthorsDiscoverListItem from './TrendingAuthorsDiscoverListItem';
import SectionWithButton from '~/components/common/SectionWithButton';
import CONSTANTS from '~/utils/CONSTANTS';

const Wrapper = styled(View)`
  width: 100%;
  flex: 1;
  margin-top: ${({ theme }) => theme.metrics.extraLargeSize * 1.5}px;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const TrendingAuthorsList = styled(FlatList)`
  width: 100%;
  flex: 1;
  margin-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

type Props = {
  data: Array<Object>,
  navigation: Object,
};

const TrendingAuthorsDiscover = ({ navigation, data }: Props): Object => (
  <Wrapper>
    <SectionWithButton
      onPress={() => {
        const { params } = navigation.state;

        navigation.navigate(
          params.LOCAL_STACK_ROUTES.TRENDING_AUTHORS_SEE_ALL,
          { [CONSTANTS.PARAMS.TRENDING_AUTHORS]: data },
        );
      }}
      sectionTitle="Trending Authors"
      buttonText="SEE ALL"
      buttonSize="small"
    />
    <TrendingAuthorsList
      renderItem={({ item, index }) => (
        <TrendingAuthorsDiscoverListItem
          isLastIndex={index === data.length - 1}
          isFirst={index === 0}
          author={item}
          onPress={() => navigation.navigate(CONSTANTS.ROUTES.AUTHOR_DETAIL, {
            [CONSTANTS.PARAMS.AUTHOR_DETAIL]: {
              id: item.id,
            },
          })
          }
        />
      )}
      keyExtractor={podcast => `${podcast.id}`}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        alignItems: 'center',
      }}
      data={data.slice(0, 5)}
      horizontal
    />
  </Wrapper>
);

export default TrendingAuthorsDiscover;
