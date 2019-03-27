// @flow

import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';

import RecentlyPlayedListItem from './RecentlyPlayedListItem';
import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.dark};
`;

type LocalPodcastManager = {
  podcastsRecentlyPlayed: Array<Object>,
  podcastsDownloaded: Array<Object>,
};

type Props = {
  localPodcastsManager: LocalPodcastManager,
  navigation: Object,
};

type State = {
  podcastsRecentlyPlayed: Array<Object>,
};

class RecentlyPlayed extends PureComponent<Props, State> {
  state = {
    podcastsRecentlyPlayed: [],
  };

  componentDidMount() {
    const { localPodcastsManager } = this.props;
    const { podcastsRecentlyPlayed, podcastsDownloaded } = localPodcastsManager;

    const podcastsRecentlyPlayedWithDownloadStatus = podcastsRecentlyPlayed.map(
      (podcastRecentlyPlayed) => {
        const isDonwloaded = podcastsDownloaded.some(
          podcast => podcast.id === podcastRecentlyPlayed.id,
        );

        return {
          ...podcastRecentlyPlayed,
          isDonwloaded,
        };
      },
    );

    this.setState({
      podcastsRecentlyPlayed: podcastsRecentlyPlayedWithDownloadStatus,
    });
  }

  render() {
    const { podcastsRecentlyPlayed } = this.state;
    const { navigation } = this.props;

    return (
      <Wrapper>
        <FlatList
          renderItem={({ item, index }) => (
            <RecentlyPlayedListItem
              onPressItem={() => navigation.navigate(CONSTANTS.ROUTES.PODCAST_DETAIL, {
                [CONSTANTS.KEYS
                  .PODCAST_DETAIL_SHOULD_SHOW_AUTHOR_SECTION]: true,
                [CONSTANTS.PARAMS.PODCAST_DETAIL]: item,
              })
              }
              podcast={item}
            />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          data={podcastsRecentlyPlayed}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  localPodcastsManager: state.localPodcastsManager,
});

export default connect(mapStateToProps)(RecentlyPlayed);
