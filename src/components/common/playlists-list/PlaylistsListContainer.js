// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlaylistCreators } from '~/store/ducks/playlist';

import PlaylistListComponent from './components/PlaylistListComponent';
import { CustomAlert, TYPES } from '~/components/common/Alert';

type Playlist = {
  podcasts: Array<Object>,
  isDownloaded: boolean,
  title: string,
};

type Props = {
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

  onAddPodcastPlaylist = (playlistTitle: string): void => {
    const {
      onToggleModal, addPodcast, playlists, podcast,
    } = this.props;

    const playlistSelected = playlists.find(
      playlist => playlist.title === playlistTitle,
    );

    const isPodcastAlreadyInPlaylist = playlistSelected.podcasts.find(
      podcastInPlaylist => podcastInPlaylist.id === podcast.id,
    );

    const handleAddPodcast = () => {
      addPodcast(playlistSelected, podcast);
      onToggleModal();
    };

    if (isPodcastAlreadyInPlaylist) {
      CustomAlert(TYPES.ADD_REPEATED_PODCAS_PLAYLIST, handleAddPodcast);
    }

    if (!isPodcastAlreadyInPlaylist) {
      handleAddPodcast();
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
  playlists: state.playlist.playlists,
});

const mapDispatchToProps = dispatch => bindActionCreators(PlaylistCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaylistListContainer);
