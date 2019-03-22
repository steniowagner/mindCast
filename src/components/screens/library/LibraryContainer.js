// @flow

import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as PlaylistsCreators } from '~/store/ducks/playlist';

import PlaylistOperationModal, {
  OPERATIONS,
} from './components/PlaylistOperationModal';
import { CustomAlert, TYPES } from '~/components/common/Alert';
import LibraryComponent from './components/LibraryComponent';
import CONSTANTS from '~/utils/CONSTANTS';
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
  createPlaylist: Function,
  navigation: Object,
};

type State = {
  isPlaylistOperationModalOpen: boolean,
  playlistTitle: string,
  modalMode: string,
};

class LibraryContainer extends Component<Props, State> {
  state = {
    isPlaylistOperationModalOpen: false,
    playlistTitle: '',
    modalMode: '',
  };

  onCreatePlaylist = (): void => {
    const { createPlaylist } = this.props;
    const { playlistTitle } = this.state;

    createPlaylist(playlistTitle);

    this.setState({
      isPlaylistOperationModalOpen: false,
      playlistTitle: '',
    });
  };

  onEditPlaylist = (): void => {
    this.setState({
      isPlaylistOperationModalOpen: false,
      playlistTitle: '',
    });
  };

  onRemovePlaylist = (playlistTitle: string): void => {
    const { removePlaylist } = this.props;

    CustomAlert(TYPES.REMOVE_PLAYLIST, () => removePlaylist(playlistTitle));
  };

  onTypePlaylistTitle = (playlistTitle: string) => {
    this.setState({
      playlistTitle,
    });
  };

  onTogglePlaylistOperationModal = (modalMode: string): void => {
    const { isPlaylistOperationModalOpen } = this.state;

    this.setState({
      isPlaylistOperationModalOpen: !isPlaylistOperationModalOpen,
      modalMode,
    });
  };

  onPressPlaylistItem = (playlistTitle: string): void => {
    const { navigation } = this.props;

    navigation.navigate(ROUTE_NAMES.PLAYLIST_DETAIL, {
      [CONSTANTS.PARAMS.PLAYLIST_TITLE]: playlistTitle,
    });
  };

  render() {
    const {
      isPlaylistOperationModalOpen,
      playlistTitle,
      modalMode,
    } = this.state;

    const { playlists } = this.props;

    const isModalCreationMode = modalMode === OPERATIONS.CREATE;

    return (
      <Fragment>
        <LibraryComponent
          onTogglePlaylistOperationModal={this.onTogglePlaylistOperationModal}
          isPlaylistOperationModalOpen={isPlaylistOperationModalOpen}
          onPressPlaylistItem={this.onPressPlaylistItem}
          onRemovePlaylist={this.onRemovePlaylist}
          onEditPlaylist={this.onEditPlaylist}
          modalOperations={OPERATIONS}
          playlists={playlists}
        />
        {isPlaylistOperationModalOpen && (
          <PlaylistOperationModal
            mainAction={
              isModalCreationMode ? this.onCreatePlaylist : this.onEditPlaylist
            }
            onToggleModal={this.onTogglePlaylistOperationModal}
            onTypePlaylistTitle={this.onTypePlaylistTitle}
            playlistTitle={playlistTitle}
            modalMode={modalMode}
          />
        )}
      </Fragment>
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
