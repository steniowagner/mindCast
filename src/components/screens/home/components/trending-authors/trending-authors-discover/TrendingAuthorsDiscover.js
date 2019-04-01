// @flow

import React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import TrendingAuthorsDiscoverListItem from './TrendingAuthorsDiscoverListItem';
import SectionWithButton from '~/components/common/SectionWithButton';
import { ROUTE_NAMES } from '../../../routes';
import PODCASTS from '../../PODCASTS_TEST';
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
  navigation: Object,
};

const TrendingAuthorsDiscover = ({ navigation }: Props): Object => (
  <Wrapper>
    <SectionWithButton
      onPress={() => navigation.navigate(ROUTE_NAMES.TRENDING_AUTHORS_SEE_ALL)}
      sectionTitle="Trending Authors"
      buttonText="SEE ALL"
      buttonSize="small"
    />
    <TrendingAuthorsList
      showsHorizontalScrollIndicator={false}
      horizontal
      keyExtractor={podcast => `${podcast.id}`}
      data={PODCASTS.map((podcast, index) => ({
        ...podcast.author,
        id: index,
      }))}
      renderItem={({ item, index }) => (
        <TrendingAuthorsDiscoverListItem
          isLastIndex={index === PODCASTS.length - 1}
          onPress={() => navigation.navigate(CONSTANTS.ROUTES.AUTHOR_DETAIL, {
            [CONSTANTS.PARAMS.AUTHOR_DETAIL]: {
              id: item.id,
            },
          })
          }
          author={item}
        />
      )}
    />
  </Wrapper>
);

export default TrendingAuthorsDiscover;
