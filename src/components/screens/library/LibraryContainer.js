// @flow

import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as PlaylistsCreators } from '~/store/ducks/playlist';

import LibraryComponent from './components/LibraryComponent';
import CONSTANTS from '~/utils/CONSTANTS';
import { CustomAlert, TYPES } from '~/components/common/Alert';
import { ROUTE_NAMES } from './routes';

type Playlist = {
  isAvailableOffline: boolean,
  dowloads: Array<string>,
  podcasts: Array<Object>,
  title: string,
};

type Props = {
  playlists: Array<Playlist>,
  removePlaylist: Function,
  navigation: Object,
};

class LibraryContainer extends Component<Props, {}> {
  onPressPlaylistItem = (playlistTitle: string): void => {
    const { navigation } = this.props;

    navigation.navigate(ROUTE_NAMES.PLAYLIST_DETAIL, {
      [CONSTANTS.PARAMS.PLAYLIST_TITLE]: playlistTitle,
    });
  };

  onRemovePlaylist = (playlistTitle: string): void => {
    const { removePlaylist } = this.props;

    CustomAlert(TYPES.REMOVE_PLAYLIST, () => removePlaylist(playlistTitle));
  };

  onEditPlaylist = (): void => {};

  render() {
    const { playlists } = this.props;

    return (
      <LibraryComponent
        onPressPlaylistItem={this.onPressPlaylistItem}
        onRemovePlaylist={this.onRemovePlaylist}
        onEditPlaylist={this.onEditPlaylist}
        playlists={playlists}
      />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(PlaylistsCreators, dispatch);

const mapStateToProps = state => ({
  playlists: state.playlist.playlists,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LibraryContainer);
