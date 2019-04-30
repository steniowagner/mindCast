// @flow

import React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import NewReleasesSectionItemList from '~/components/common/author-detail/components/new-releases-section/NewReleasesSectionItemList';
import SectionWithButton from '~/components/common/SectionWithButton';
import CONSTANTS from '~/utils/CONSTANTS';

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
  data: Array<Object>,
  navigation: Object,
};

const HottestPodcastsDiscover = ({ navigation, data }: Props): Object => (
  <Wrapper>
    <SectionWithButton
      onPress={() => {
        const { params } = navigation.state;
        navigation.navigate(
          params.LOCAL_STACK_ROUTES.HOTTEST_PODCASTS_SEE_ALL,
          {
            [CONSTANTS.PARAMS.PODCASTS_HOTTEST_PODCASTS]: data,
          },
        );
      }}
      sectionTitle="Hottest Podcasts"
      buttonText="SEE ALL"
      buttonSize="small"
    />
    <HottestPodcastsDiscoverList
      keyExtractor={podcast => `${podcast.id}`}
      showsHorizontalScrollIndicator={false}
      data={data.slice(0, 9)}
      horizontal
      renderItem={({ item, index }) => (
        <NewReleasesSectionItemList
          onPress={() => navigation.navigate(CONSTANTS.ROUTES.PODCAST_DETAIL, {
            [CONSTANTS.KEYS.PODCAST_DETAIL_SHOULD_SHOW_AUTHOR_SECTION]: true,
            [CONSTANTS.PARAMS.PODCAST_DETAIL]: item,
          })
          }
          isLastIndex={index === data.length - 1}
          imageURL={item.imageURL}
          subject={item.category}
          title={item.title}
          stars={item.stars}
        />
      )}
    />
  </Wrapper>
);

export default HottestPodcastsDiscover;
