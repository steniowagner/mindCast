// @flow

import React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import NewReleasesSectionItemList from '~/components/common/author-detail/components/new-releases-section/NewReleasesSectionItemList';
import SectionWithButton from '~/components/common/SectionWithButton';
import { ROUTE_NAMES } from '../../routes';

const Wrapper = styled(View)`
  width: 100%;
  flex: 1;
  margin-top: ${({ theme }) => theme.metrics.extraLargeSize * 1.5}px;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const HottestPodcastsDiscoverList = styled(FlatList)`
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
      onPress={() => navigation.navigate(ROUTE_NAMES.HOTTEST_PODCASTS_SEE_ALL)}
      sectionTitle="Hottest Podcasts"
      buttonText="SEE ALL"
      buttonSize="small"
    />
    <HottestPodcastsDiscoverList
      showsHorizontalScrollIndicator={false}
      horizontal
      keyExtractor={podcast => `${podcast.id}`}
      data={[1, 2, 3, 4]}
      renderItem={({ item, index }) => (
        <NewReleasesSectionItemList
          onPress={() => {}}
          isLastIndex={index === 3}
          imageURL=""
          subject="science"
          title="UAHEAUHEUAHEUAH"
          stars={3.5}
        />
      )}
    />
  </Wrapper>
);

export default TrendingAuthorsDiscover;
