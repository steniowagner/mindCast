// @flow

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import { setHeaderPlayButtonPress } from '~/routes/utils/navigationOptions';
import NewReleasesSeeAllListItem from '~/components/common/PodcastItemLIst';
import CONSTANTS from '~/utils/CONSTANTS';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

const NewReleasesSeeAllList = styled(FlatList)`
  width: 100%;
  height: 100%;
`;

type Props = {
  data: Array<Object>,
  navigation: Object,
};

class NewReleasesSeeAll extends Component<Props, {}> {
  componentDidMount() {
    const newReleases = this.getNewReleases();
    const { navigation } = this.props;

    setHeaderPlayButtonPress(newReleases, navigation);
  }

  getNewReleases = (): Array<Object> => {
    const { navigation } = this.props;
    const { params } = navigation.state;

    return params[CONSTANTS.PARAMS.PODCASTS_NEW_RELEASES];
  };

  render() {
    const { navigation } = this.props;

    const newReleases = this.getNewReleases();

    return (
      <Wrapper>
        <NewReleasesSeeAllList
          keyExtractor={podcast => `${podcast.id}`}
          showsVerticalScrollIndicator={false}
          data={newReleases}
          renderItem={({ item, index }) => (
            <NewReleasesSeeAllListItem
              onPressItem={() => navigation.navigate(CONSTANTS.ROUTES.PODCAST_DETAIL, {
                [CONSTANTS.KEYS
                  .PODCAST_DETAIL_SHOULD_SHOW_AUTHOR_SECTION]: true,
                [CONSTANTS.PARAMS.PODCAST_DETAIL]: item,
              })
              }
              shouldShowDownloadStatus={false}
              index={index + 1}
              podcast={item}
            />
          )}
        />
      </Wrapper>
    );
  }
}

export default NewReleasesSeeAll;
