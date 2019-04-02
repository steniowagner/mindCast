// @flow

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import HottestPodcastsSeeAllListItem from '~/components/common/PodcastItemLIst';

import { setHeaderPlayButtonPress } from '~/routes/utils/navigationOptions';
import AuthorsListItem from '~/components/common/AuthorListItem';
import CONSTANTS from '~/utils/CONSTANTS';

import PODCASTS from '../PODCASTS_TEST';

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

type Props = {
  navigation: Object,
};

class HottestPodcastsSeeAll extends Component<Props, {}> {
  componentDidMount() {
    const { navigation } = this.props;

    setHeaderPlayButtonPress(PODCASTS, navigation);
  }

  render() {
    const { navigation } = this.props;

    return (
      <Wrapper>
        <HottestPodcastsSeeAllList
          keyExtractor={podcast => `${podcast.id}`}
          showsVerticalScrollIndicator={false}
          data={PODCASTS}
          renderItem={({ item, index }) => (
            <HottestPodcastsSeeAllListItem
              onPressItem={() => navigation.navigate(CONSTANTS.ROUTES.PODCAST_DETAIL, {
                [CONSTANTS.KEYS
                  .PODCAST_DETAIL_SHOULD_SHOW_AUTHOR_SECTION]: true,
                [CONSTANTS.PARAMS.PODCAST_DETAIL]: item,
              })
              }
              shouldShowDownloadStatus={false}
              roundedImage={false}
              podcast={item}
              index={index + 1}
            />
          )}
        />
      </Wrapper>
    );
  }
}

export default HottestPodcastsSeeAll;
