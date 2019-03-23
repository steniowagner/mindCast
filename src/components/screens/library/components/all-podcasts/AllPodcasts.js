// @flow

import React from 'react';
import { FlatList, View, Text } from 'react-native';
import styled from 'styled-components';

import AllPodcastsListItem from './AllPodcastsListItem';
import CONSTANTS from '~/utils/CONSTANTS';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.dark};
`;

type Props = {
  navigation: Object,
};

const AllPodcasts = ({ navigation }: Props): Object => {
  const { params } = navigation.state;
  const allPodcasts = params[CONSTANTS.KEYS.ALL_PODCASTS];

  return (
    <Wrapper>
      <FlatList
        renderItem={({ item, index }) => (
          <AllPodcastsListItem
            onPressDetailButton={() => navigation.navigate(CONSTANTS.ROUTES.PODCAST_DETAIL, {
              [CONSTANTS.KEYS
                .PODCAST_DETAIL_SHOULD_SHOW_AUTHOR_SECTION]: true,
              [CONSTANTS.PARAMS.PODCAST_DETAIL]: item,
            })
            }
            podcast={item}
          />
        )}
        keyExtractor={item => `${item.id}`}
        data={allPodcasts}
      />
    </Wrapper>
  );
};

export default AllPodcasts;
