// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlaylistCreators } from '~/store/ducks/playlist';

import PlaylistDetailComponent from './components/PlaylistDetailComponent';
import { CustomAlert, TYPES } from '~/components/common/Alert';
import CONSTANTS from '~/utils/CONSTANTS';

type State = {
  isPlaylistAvailableOffline: boolean,
};

type Playlist = {
  isAvailableOffline: boolean,
  dowloads: Array<string>,
  podcasts: Array<Object>,
  title: string,
};

type LocalPodcastManager = {
  podcastsDownloaded: Array<Object>,
  downloadingList: Array<Object>,
};

type Props = {
  localPodcastsManager: LocalPodcastManager,
  setOfflineAvailability: Function,
  LOCAL_STACK_ROUTES: Object,
  removePodcast: Function,
  getPlaylist: Function,
  navigation: Object,
  playlist: Playlist,
};

class PlaylistDetailContainer extends Component<Props, State> {
  state = {
    isPlaylistAvailableOffline: false,
  };

  componentDidMount() {
    const { LOCAL_STACK_ROUTES, getPlaylist, navigation } = this.props;
    const { params } = navigation.state;

    const playlistTitle = params[CONSTANTS.PARAMS.PLAYLIST_TITLE];

    navigation.setParams({
      LOCAL_STACK_ROUTES,
    });

    getPlaylist(playlistTitle);
  }

  componentWillReceiveProps(nextProps) {
    const { playlist } = nextProps;

    if (playlist.title) {
      const { isAvailableOffline } = playlist;

      this.setState({
        isPlaylistAvailableOffline: isAvailableOffline,
      });
    }
  }

  onPressHeaderButton = (shouldShufflePlaylist: boolean): void => {
    const { navigation } = this.props;
    const { playlist } = this.props;

    navigation.navigate(CONSTANTS.ROUTES.PLAYER, {
      [CONSTANTS.PARAMS.PLAYER]: {
        [CONSTANTS.KEYS.SHOULD_SHUFFLE_PLAYLIST]: shouldShufflePlaylist,
        [CONSTANTS.KEYS.PLAYLIST]: playlist.podcasts,
      },
    });
  };

  onTogglePlaylistDownloadedSwitch = (): void => {
    const { setOfflineAvailability, playlist } = this.props;
    const { isPlaylistAvailableOffline } = this.state;

    this.setState({
      isPlaylistAvailableOffline: !isPlaylistAvailableOffline,
    });

    setOfflineAvailability(playlist, !isPlaylistAvailableOffline);
  };

  onRemovePodcastFromPlaylist = (podcastIndex: number): void => {
    const { removePodcast, playlist } = this.props;

    CustomAlert(TYPES.REMOVE_PODCAST_FROM_PLAYLIST, () => removePodcast(playlist, podcastIndex));
  };

  getPodcastsImages = (podcasts: Array<Object>): Array<string> => {
    let images = [];

    if (podcasts) {
      images = podcasts.slice(0, 4).map(podcast => podcast.imageURL);
    }

    return images;
  };

  getPodcastsWithDownloadStatus = (
    podcastsDownloaded: Array<Object>,
    downloadingList: Array<Object>,
    podcasts: Array<Object>,
  ): Array<Object> => {
    const podcastsWithDownloadStatus = podcasts.map((podcast) => {
      const isPodcastBeenDownloaded = downloadingList.some(
        downloadInfo => downloadInfo.id === podcast.id,
      );

      const isPodcastAlreadyDownloaded = podcastsDownloaded.some(
        podcastDownloaded => podcastDownloaded.id === podcast.id,
      );

      return {
        ...podcast,
        isDownloaded: isPodcastAlreadyDownloaded,
        isDownloading: isPodcastBeenDownloaded,
      };
    });

    return podcastsWithDownloadStatus;
  };

  render() {
    const { localPodcastsManager, navigation, playlist } = this.props;
    const { isPlaylistAvailableOffline } = this.state;

    const { downloadingList, podcastsDownloaded } = localPodcastsManager;
    const { podcasts, title } = playlist;

    const podcastsWithDownloadStatus = this.getPodcastsWithDownloadStatus(
      podcastsDownloaded,
      downloadingList,
      podcasts,
    );

    const podcastsImages = this.getPodcastsImages(podcasts);

    return (
      <PlaylistDetailComponent
        onTogglePlaylistDownloadedSwitch={this.onTogglePlaylistDownloadedSwitch}
        onRemovePodcastFromPlaylist={this.onRemovePodcastFromPlaylist}
        isPlaylistAvailableOffline={isPlaylistAvailableOffline}
        onPressPlayAllButton={() => {
          if (podcastsWithDownloadStatus.length > 0) {
            this.onPressHeaderButton(false);
          }
        }}
        onPressShuffleButton={() => {
          if (podcastsWithDownloadStatus.length > 0) {
            this.onPressHeaderButton(true);
          }
        }}
        podcasts={podcastsWithDownloadStatus}
        podcastsImages={podcastsImages}
        navigation={navigation}
        title={title}
      />
    );
  }
}

const mapStateToProps = state => ({
  localPodcastsManager: state.localPodcastsManager,
  playlist: state.playlist.playlist,
});

const mapDispatchToProps = dispatch => bindActionCreators(PlaylistCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaylistDetailContainer);
