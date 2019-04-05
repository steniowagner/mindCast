// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as LocalPodcastsManagerCreators } from '~/store/ducks/localPodcastsManager';

import PodcastDetailComponent from './components/PodcastDetailComponent';
import { CustomAlert, TYPES } from '~/components/common/Alert';
import CONSTANTS from '~/utils/CONSTANTS';

type Props = {
  podcastsDownloaded: Array<Object>,
  downloadPodcast: Function,
  removePodcast: Function,
  navigation: Object,
};

type State = {
  isAddPlaylistModalOpen: boolean,
};

class PodcastDetail extends Component<Props, State> {
  state = {
    isAddPlaylistModalOpen: false,
  };

  onPressDownloadButton = (
    isPodcastDownloaded: boolean,
    podcast: Object,
  ): void => {
    const { downloadPodcast, removePodcast } = this.props;
    const { url, id } = podcast;

    let action;
    let type;

    if (isPodcastDownloaded) {
      const isPodcastDownloadedByPlaylist = this.checkPodcastAvailableOfflineWithPlaylist(
        podcast,
      );

      type = isPodcastDownloadedByPlaylist
        ? TYPES.REMOVE_DOWNLOADED_PODCAST_BY_PLAYLIST
        : TYPES.REMOVE_DOWNLOADED_PODCAST;

      action = () => removePodcast({ id });
    }

    if (!isPodcastDownloaded) {
      action = () => downloadPodcast(podcast);
      type = TYPES.DOWNLOAD_PODCAST;
    }

    CustomAlert(type, action);
  };

  onToggleAddPlaylistModal = (): void => {
    const { isAddPlaylistModalOpen } = this.state;

    this.setState({
      isAddPlaylistModalOpen: !isAddPlaylistModalOpen,
    });
  };

  getProps = (): void => {
    const { navigation } = this.props;
    const { params } = navigation.state;

    const shouldShowAuthorSection = params[CONSTANTS.KEYS.PODCAST_DETAIL_SHOULD_SHOW_AUTHOR_SECTION];
    const podcast = params[CONSTANTS.PARAMS.PODCAST_DETAIL];

    return {
      shouldShowAuthorSection,
      podcast,
    };
  };

  onPressPlay = (): void => {
    const { podcast } = this.getProps();
    const { navigation } = this.props;

    navigation.navigate(CONSTANTS.ROUTES.PLAYER, {
      [CONSTANTS.PARAMS.PLAYER]: {
        [CONSTANTS.KEYS.PLAYLIST]: [podcast],
      },
    });
  };

  checkPodcastAvailableOfflineWithPlaylist = (podcast: Object): boolean => {
    const { playlists } = this.props;

    const isPodcastDownloadedByPlaylist = playlists
      .filter(playlist => playlist.isAvailableOffline)
      .some(playlist => playlist.podcasts.some(
        playlistPodcast => playlistPodcast.id === podcast.id,
      ));

    return isPodcastDownloadedByPlaylist;
  };

  checkPodcastDownloadStatus = (listKey: string, podcastId: string) => {
    const { localPodcastsManager } = this.props;

    const isPodcastOnTheList = localPodcastsManager[listKey].some((podcast) => {
      if (typeof podcast === 'object') {
        return podcast.id === podcastId;
      }

      return podcast === podcastId;
    });

    return isPodcastOnTheList;
  };

  render() {
    const { isAddPlaylistModalOpen } = this.state;
    const { navigation } = this.props;

    const { shouldShowAuthorSection, podcast } = this.getProps();

    const isPodcastDownloaded = this.checkPodcastDownloadStatus(
      'podcastsDownloaded',
      podcast.id,
    );

    const isDownloadingPodcast = this.checkPodcastDownloadStatus(
      'downloadingList',
      podcast.id,
    );

    return (
      <PodcastDetailComponent
        onPressDownloadButton={() => this.onPressDownloadButton(isPodcastDownloaded, podcast)
        }
        onToggleAddPlaylistModal={this.onToggleAddPlaylistModal}
        shouldShowAuthorSection={shouldShowAuthorSection}
        isAddPlaylistModalOpen={isAddPlaylistModalOpen}
        isDownloadingPodcast={isDownloadingPodcast}
        isPodcastDownloaded={isPodcastDownloaded}
        onPressPlay={this.onPressPlay}
        navigation={navigation}
        podcast={podcast}
      />
    );
  }
}

const mapStateToProps = state => ({
  localPodcastsManager: state.localPodcastsManager,
  playlists: state.playlist.playlists,
});

const mapDispatchToProps = dispatch => bindActionCreators(LocalPodcastsManagerCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PodcastDetail);
