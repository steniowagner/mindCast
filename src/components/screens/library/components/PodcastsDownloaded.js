// @flow

import React, { PureComponent } from 'react';
import { FlatList, View, Text } from 'react-native';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { Creators as PlaylistsCreators } from '~/store/ducks/playlist';

import { setHeaderPlayButtonPress } from '~/routes/utils/navigationOptions';
import PodcastsDownloadedListItem from '~/components/common/PodcastItemLIst';
import CONSTANTS from '~/utils/CONSTANTS';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

const PodcastsDownloadedList = styled(FlatList)`
  width: 100%;
  height: 100%;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
`;

type Props = {
  podcastsDownloaded: Array<Object>,
  navigation: Object,
};

class PodcastsDownloaded extends PureComponent<Props, {}> {
  componentDidMount() {
    const { podcastsDownloaded, navigation } = this.props;
    const { params } = navigation.state;

    setHeaderPlayButtonPress(podcastsDownloaded, navigation);
  }

  render() {
    const { podcastsDownloaded, navigation } = this.props;

    return (
      <Wrapper>
        <PodcastsDownloadedList
          renderItem={({ item, index }) => (
            <PodcastsDownloadedListItem
              onPressItem={() => navigation.navigate(CONSTANTS.ROUTES.PLAYER, {
                [CONSTANTS.PARAMS.PLAYER]: {
                  [CONSTANTS.KEYS.PLAYLIST]: [item],
                },
              })
              }
              index={index + 1}
              podcast={item}
            />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          data={podcastsDownloaded}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  podcastsDownloaded: state.localPodcastsManager.podcastsDownloaded,
});

export default connect(mapStateToProps)(PodcastsDownloaded);
