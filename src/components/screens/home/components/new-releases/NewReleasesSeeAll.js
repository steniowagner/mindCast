// @flow

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import PODCASTS from '../PODCASTS_TEST';

import { setHeaderPlayButtonPress } from '~/routes/utils/navigationOptions';
import NewReleasesSeeAllListItem from '~/components/common/PodcastItemLIst';
import CONSTANTS from '~/utils/CONSTANTS';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.dark};
`;

const NewReleasesSeeAllList = styled(FlatList)`
  width: 100%;
  height: 100%;
`;

type Props = {
  navigation: Object,
};

class NewReleasesSeeAll extends Component<Props, {}> {
  componentDidMount() {
    const { navigation } = this.props;

    setHeaderPlayButtonPress(PODCASTS, navigation);
  }

  render() {
    const { navigation } = this.props;

    return (
      <Wrapper>
        <NewReleasesSeeAllList
          keyExtractor={podcast => `${podcast.id}`}
          showsVerticalScrollIndicator={false}
          data={PODCASTS}
          renderItem={({ item, index }) => (
            <NewReleasesSeeAllListItem
              onPressItem={() => navigation.navigate(CONSTANTS.ROUTES.PODCAST_DETAIL, {
                [CONSTANTS.KEYS
                  .PODCAST_DETAIL_SHOULD_SHOW_AUTHOR_SECTION]: true,
                [CONSTANTS.PARAMS.PODCAST_DETAIL]: item,
              })
              }
              shouldShowDownloadStatus={false}
              podcast={item}
              index={index + 1}
            />
          )}
        />
      </Wrapper>
    );
  }
}

export default NewReleasesSeeAll;
