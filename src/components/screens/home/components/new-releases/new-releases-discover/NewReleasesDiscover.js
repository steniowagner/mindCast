// @flow

import React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import NewReleasesDiscoverListItem from './NewReleasesDiscoverListItem';
import SectionWithButton from '~/components/common/SectionWithButton';
import CONSTANTS from '~/utils/CONSTANTS';

const Wrapper = styled(View)`
  width: 100%;
  flex: 1;
  margin-top: ${({ theme }) => theme.metrics.extraLargeSize * 1.5}px;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const NewReleasesDiscoverList = styled(FlatList)`
  width: 100%;
  flex: 1;
  margin-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

type Props = {
  data: Array<Object>,
  navigation: Object,
};

const NewReleasesDiscover = ({ navigation, data }: Props): Object => (
  <Wrapper>
    <SectionWithButton
      onPress={() => {
        const { params } = navigation.state;
        navigation.navigate(params.LOCAL_STACK_ROUTES.NEW_RELEASES_SEE_ALL, {
          [CONSTANTS.PARAMS.PODCASTS_NEW_RELEASES]: data,
        });
      }}
      sectionTitle="New Releases"
      buttonText="SEE ALL"
      buttonSize="small"
    />
    <NewReleasesDiscoverList
      keyExtractor={podcast => `${podcast.id}`}
      showsHorizontalScrollIndicator={false}
      horizontal
      data={data.slice(0, 9)}
      renderItem={({ item, index }) => (
        <NewReleasesDiscoverListItem
          onPressItem={() => navigation.navigate(CONSTANTS.ROUTES.PODCAST_DETAIL, {
            [CONSTANTS.KEYS.PODCAST_DETAIL_SHOULD_SHOW_AUTHOR_SECTION]: true,
            [CONSTANTS.PARAMS.PODCAST_DETAIL]: item,
          })
          }
          authorImage={item.author.thumbnailProfileImageURL}
          authorName={item.author.name}
          podcastImage={item.imageURL}
          isLastIndex={index === data.length - 1}
          navigation={navigation}
          subject={item.category}
          title={item.title}
        />
      )}
    />
  </Wrapper>
);

export default NewReleasesDiscover;
