// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlaylistCreators } from '~/store/ducks/playlist';

import PlaylistListComponent from './components/PlaylistListComponent';
import { CustomAlert, TYPES } from '~/components/common/Alert';

type Playlist = {
  podcastsDownloaded: Array<Object>,
  podcasts: Array<Object>,
  isAvailableOffline: boolean,
  title: string,
};

type Props = {
  podcastsDownloaded: Array<Object>,
  playlists: Array<Playlist>,
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

  handleAddPodcast = (playlistTitle: string): void => {
    const {
      onToggleModal, addPodcast, playlists, podcast,
    } = this.props;

    const playlistSelected = playlists.find(
      playlist => playlist.title === playlistTitle,
    );

    addPodcast(playlistSelected, podcast);

    onToggleModal();
  };

  onAddPodcastPlaylist = (playlistTitle: string): void => {
    const { playlists, podcast } = this.props;

    const playlistSelected = playlists.find(
      playlist => playlist.title === playlistTitle,
    );

    const isPodcastAlreadyInPlaylist = playlistSelected.podcasts.find(
      podcastInPlaylist => podcastInPlaylist.id === podcast.id,
    );

    if (isPodcastAlreadyInPlaylist) {
      CustomAlert(TYPES.ADD_REPEATED_PODCAS_PLAYLIST, this.handleAddPodcast);
    }

    if (!isPodcastAlreadyInPlaylist) {
      this.handleAddPodcast();
    }
  };

  handleAddPodcastDownloadedPlaylist = (playlist: Playlist): void => {
    const { podcastsDownloaded, podcast } = this.props;
    const isPodcastAlreadyDownloaded = podcastsDownloaded.some(
      podcastDownloaded => podcastDownloaded.id === podcast.id,
    );

    if (!isPodcastAlreadyDownloaded) {
      CustomAlert(
        TYPES.ADD_UNDOWNLOADED_PODCAST_PLAYLIST_AVAILABLE_OFFLINE,
        handleAddPodcast,
      );
    }
  };

  onPressPlaylistListItem = (playlist: Playlist): void => {
    if (playlist.isAvailableOffline) {
      this.handleAddPodcastDownloadedPlaylist(playlist);
    }

    if (!playlist.isAvailableOffline) {
      this.onAddPodcastPlaylist(playlist.title);
    }
  };

  render() {
    const { onToggleModal, playlists } = this.props;

    return (
      <PlaylistListComponent
        onAddPodcastPlaylist={this.onAddPodcastPlaylist}
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
