// @flow

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import HottestPodcastsSeeAllListItem from '~/components/screens/library/components/podcasts-downloaded/PodcastsDownloadedListItem';
import AuthorsListItem from '~/components/common/AuthorsListItem';
import CONSTANTS from '~/utils/CONSTANTS';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.dark};
`;

const HottestPodcastsSeeAllList = styled(FlatList)`
  width: 100%;
  height: 100%;
`;

class HottestPodcastsSeeAll extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <Wrapper>
        <HottestPodcastsSeeAllList
          keyExtractor={podcast => `${podcast.id}`}
          showsVerticalScrollIndicator={false}
          data={[1, 2, 3, 4]}
          renderItem={({ item, index }) => (
            <HottestPodcastsSeeAllListItem
              index={index}
              podcast={{
                imageURL: '',
                title: 'My Title',
                author: {
                  name: 'Stenio Wagner',
                },
                duration: '23:10',
              }}
              title="uhaauhuahueh"
              onPressItem={() => navigation.navigate(CONSTANTS.ROUTES.PODCAST_DETAIL, {
                [CONSTANTS.KEYS
                  .PODCAST_DETAIL_SHOULD_SHOW_AUTHOR_SECTION]: true,
                [CONSTANTS.PARAMS.PODCAST_DETAIL]: item,
              })
              }
            />
          )}
        />
      </Wrapper>
    );
  }
}

export default HottestPodcastsSeeAll;
