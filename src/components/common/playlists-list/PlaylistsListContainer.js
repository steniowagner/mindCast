// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlaylistCreators } from '~/store/ducks/playlist';

import { CustomAlert, TYPES } from '~/components/common/Alert';
import PlaylistListComponent from './components/PlaylistListComponent';

type Playlist = {
  podcastsDownloaded: Array<Object>,
  isAvailableOffline: boolean,
  podcasts: Array<Object>,
  title: string,
};

type Props = {
  podcastsDownloaded: Array<Object>,
  playlists: Array<Playlist>,
  createPlaylist: Function,
  onToggleModal: Function,
  loadPlaylists: Function,
  addPodcast: Function,
  podcast: Object,
};

class PlaylistListContainer extends Component<Props, {}> {
  componentDidMount() {
    const { loadPlaylists } = this.props;

    loadPlaylists();
  }

  onAddPodcast = (playlist: Playlist): void => {
    const { onToggleModal, addPodcast, podcast } = this.props;

    addPodcast(playlist, podcast);
    onToggleModal();
  };

  onPressPlaylistListItem = (playlist: Playlist): void => {
    const isPodcastAlreadyInPlaylist = this.checkIsPodcastAlreadyInPlaylist(
      playlist,
    );

    const isPodcastAlreadyDownloaded = this.checkIsPodcastAlreadyDownloaded(
      playlist,
    );

    if (
      playlist.isAvailableOffline
      && !isPodcastAlreadyInPlaylist
      && !isPodcastAlreadyDownloaded
    ) {
      CustomAlert(
        TYPES.ADD_UNDOWNLOADED_PODCAST_PLAYLIST_AVAILABLE_OFFLINE,
        () => this.onAddPodcast(playlist),
      );

      return;
    }

    if (isPodcastAlreadyInPlaylist) {
      CustomAlert(TYPES.ADD_REPEATED_PODCAS_PLAYLIST, () => this.onAddPodcast(playlist));

      return;
    }

    this.onAddPodcast(playlist);
  };

  checkIsPodcastAlreadyDownloaded = (playlist: Playlist): boolean => {
    const { podcastsDownloaded, podcast } = this.props;

    const isPodcastAlreadyDownloaded = podcastsDownloaded.some(
      podcastDownloaded => podcastDownloaded.id === podcast.id,
    );

    return isPodcastAlreadyDownloaded;
  };

  checkIsPodcastAlreadyInPlaylist = (playlist: Playlist): boolean => {
    const { podcast } = this.props;

    const isPodcastAlreadyInPlaylist = playlist.podcasts.some(
      podcastInPlaylist => podcastInPlaylist.id === podcast.id,
    );

    return isPodcastAlreadyInPlaylist;
  };

  render() {
    const { onToggleModal, playlists, createPlaylist } = this.props;

    return (
      <PlaylistListComponent
        onPressPlaylistListItem={this.onPressPlaylistListItem}
        createPlaylist={createPlaylist}
        onToggleModal={onToggleModal}
        playlists={playlists}
      />
    );
  }
}

const mapStateToProps = state => ({
  podcastsDownloaded: state.localPodcastsManager.podcastsDownloaded,
  playlists: state.playlist.playlists,
});

const mapDispatchToProps = dispatch => bindActionCreators(PlaylistCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaylistListContainer);
