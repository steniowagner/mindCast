// @flow

import React, { PureComponent } from 'react';
import { FlatList, View, Text } from 'react-native';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { Creators as PlaylistsCreators } from '~/store/ducks/playlist';

import { setHeaderPlayButtonPress } from '~/routes/utils/navigationOptions';
import RecentlyPlayedListItem from '~/components/common/PodcastItemLIst';
import CONSTANTS from '~/utils/CONSTANTS';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

type Playlist = {
  isAvailableOffline: boolean,
  downloads: Array<string>,
  podcasts: Array<Object>,
  title: string,
};

type Props = {
  podcastsDownloaded: Array<Object>,
  playlists: Array<Playlist>,
  navigation: Object,
};

type State = {
  userPodcasts: Array<Object>,
};

class YourPodcasts extends PureComponent<Props, State> {
  state = {
    userPodcasts: [],
  };

  componentDidMount() {
    this.setUserPodcasts(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setUserPodcasts(nextProps);
  }

  componentDidUpdate(_, prevState) {
    const { userPodcasts } = this.state;

    const isListLengthChanged = userPodcasts.length !== prevState.userPodcasts.length;

    const hasNewItemInserted = prevState.userPodcasts.some(
      prevUserPodcast => userPodcasts.findIndex(
        userPodcast => userPodcast.id === prevUserPodcast.id,
      ) === -1,
    );

    if (hasNewItemInserted || isListLengthChanged) {
      const { navigation } = this.props;
      const { params } = navigation.state;

      setHeaderPlayButtonPress(userPodcasts, navigation);
    }
  }

  setUserPodcasts = (props: Props): void => {
    const { podcastsDownloaded, playlists } = props;

    const userPodcasts = this.getUserPodcasts(podcastsDownloaded, playlists);
    const userPodcastsWithDownloadStatus = this.setPodcastsDownloadStatus(
      podcastsDownloaded,
      userPodcasts,
    );

    this.setState({
      userPodcasts: userPodcastsWithDownloadStatus,
    });
  };

  getUserPodcasts = (
    podcastsDownloaded: Array<Object>,
    playlists: Array<Playlist>,
  ): Array<Object> => {
    const podcastsFromPlaylists = this.getPodcastsFromPlaylists(playlists);

    const userPodcasts = podcastsFromPlaylists.concat(
      podcastsDownloaded.filter(
        podcastDownloaded => podcastsFromPlaylists.findIndex(
          podcastFromPlaylists => podcastFromPlaylists.id === podcastDownloaded.id,
        ) < 0,
      ),
    );

    return userPodcasts;
  };

  removePodcastsDuplicated = (podcasts: Array<Object>): Array<Object> => {
    const podcastsWithouDuplicated = podcasts.filter((podcast, index) => {
      const podcastIndex = podcasts.findIndex(
        podcastItem => podcastItem.id === podcast.id,
      );

      return podcastIndex === index;
    });

    return podcastsWithouDuplicated;
  };

  getPodcastsFromPlaylists = (playlists: Array<Playlist>): Array<Object> => {
    const podcastsFromPlaylistsWithPossibleDuplicates = playlists
      .map(playlist => playlist.podcasts)
      .reduce((podcastsList, podcasts) => podcastsList.concat(podcasts), []);

    const podcastsFromPlaylists = this.removePodcastsDuplicated(
      podcastsFromPlaylistsWithPossibleDuplicates,
    );

    return podcastsFromPlaylists;
  };

  setPodcastsDownloadStatus = (
    podcastsDownloaded: Array<Object>,
    podcasts: Array<Object>,
  ): Array<Object> => {
    const userPodcastsWithDownloadStatus = podcasts.map((podcast) => {
      const isDownloaded = podcastsDownloaded.some(
        podcastDownloaded => podcastDownloaded.id === podcast.id,
      );

      return {
        ...podcast,
        isDownloaded,
      };
    });

    return userPodcastsWithDownloadStatus;
  };

  render() {
    const { userPodcasts } = this.state;
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
              shouldShowDownloadStatus
              isDownloading={false}
              index={index + 1}
              podcast={item}
            />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          data={userPodcasts}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  podcastsDownloaded: state.localPodcastsManager.podcastsDownloaded,
  playlists: state.playlist.playlists,
});

export default connect(mapStateToProps)(YourPodcasts);
