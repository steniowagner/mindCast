// @flow

import React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import NewReleasesDiscoverListItem from './NewReleasesDiscoverListItem';
import SectionWithButton from '~/components/common/SectionWithButton';
import CONSTANTS from '~/utils/CONSTANTS';

import PODCAST from '../../PODCASTS_TEST';

const Wrapper = styled(View)`
  width: 100%;
  flex: 1;
  margin-top: ${({ theme }) => theme.metrics.extraLargeSize * 1.5}px;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const NewReleasesDiscover = styled(FlatList)`
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
      onPress={() => {
        const { params } = navigation.state;
        navigation.navigate(params.LOCAL_STACK_ROUTES.NEW_RELEASES_SEE_ALL);
      }}
      sectionTitle="New Releases"
      buttonText="SEE ALL"
      buttonSize="small"
    />
    <NewReleasesDiscover
      keyExtractor={podcast => `${podcast.id}`}
      showsHorizontalScrollIndicator={false}
      horizontal
      data={PODCAST}
      renderItem={({ item, index }) => (
        <NewReleasesDiscoverListItem
          onPressItem={() => navigation.navigate(CONSTANTS.ROUTES.PODCAST_DETAIL, {
            [CONSTANTS.KEYS.PODCAST_DETAIL_SHOULD_SHOW_AUTHOR_SECTION]: true,
            [CONSTANTS.PARAMS.PODCAST_DETAIL]: item,
          })
          }
          authorImage={item.author.thumbnailImageURL}
          authorName={item.author.name}
          podcastImage={item.imageURL}
          isLastIndex={index === PODCAST.length - 1}
          navigation={navigation}
          subject={item.subject}
          title={item.title}
        />
      )}
    />
  </Wrapper>
);

export default TrendingAuthorsDiscover;
