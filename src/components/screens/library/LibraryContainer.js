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
  editPlaylist: Function,
  navigation: Object,
};

type State = {
  isPlaylistOperationModalOpen: boolean,
  isPlaylistTitleAlreadyInUse: boolean,
  indexPlaylistToEdit: number,
  playlistTitle: string,
  modalMode: string,
};

class LibraryContainer extends Component<Props, State> {
  state = {
    isPlaylistOperationModalOpen: false,
    isPlaylistTitleAlreadyInUse: false,
    indexPlaylistToEdit: 0,
    playlistTitle: '',
    modalMode: '',
  };

  onCreatePlaylist = (): void => {
    const { createPlaylist } = this.props;
    const { playlistTitle } = this.state;

    const isTitleAlreadyInUse = this.checkPlaylistTitleIsAlreadyInUse();

    if (isTitleAlreadyInUse) {
      this.setState({
        isPlaylistTitleAlreadyInUse: true,
      });

      return;
    }

    createPlaylist(playlistTitle);

    this.setState({
      isPlaylistOperationModalOpen: false,
      isPlaylistTitleAlreadyInUse: false,
      playlistTitle: '',
    });
  };

  onEditPlaylist = (index: number): void => {
    const { editPlaylist } = this.props;
    const { indexPlaylistToEdit, playlistTitle } = this.state;

    const isTitleAlreadyInUse = this.checkPlaylistTitleIsAlreadyInUse();

    if (isTitleAlreadyInUse) {
      this.setState({
        isPlaylistTitleAlreadyInUse: true,
      });

      return;
    }

    editPlaylist(playlistTitle, indexPlaylistToEdit);

    this.setState({
      isPlaylistOperationModalOpen: false,
      isPlaylistTitleAlreadyInUse: false,
      playlistTitle: '',
    });
  };

  onRemovePlaylist = (playlistTitle: string): void => {
    const { removePlaylist } = this.props;

    CustomAlert(TYPES.REMOVE_PLAYLIST, () => removePlaylist(playlistTitle));
  };

  onTypePlaylistTitle = (playlistTitle: string) => {
    this.setState({
      isPlaylistTitleAlreadyInUse: false,
      playlistTitle,
    });
  };

  onTogglePlaylistOperationModal = (
    modalMode: string,
    playlistTitle: string,
    index: number,
  ): void => {
    const { isPlaylistOperationModalOpen } = this.state;

    this.setState({
      isPlaylistOperationModalOpen: !isPlaylistOperationModalOpen,
      isPlaylistTitleAlreadyInUse: false,
      indexPlaylistToEdit: index,
      playlistTitle,
      modalMode,
    });
  };

  onPressPlaylistItem = (playlistTitle: string): void => {
    const { navigation } = this.props;

    navigation.navigate(ROUTE_NAMES.PLAYLIST_DETAIL, {
      [CONSTANTS.PARAMS.PLAYLIST_TITLE]: playlistTitle,
    });
  };

  checkPlaylistTitleIsAlreadyInUse = (): boolean => {
    const { playlistTitle } = this.state;
    const { playlists } = this.props;

    const isTitleAlreadyInUse = playlists.some(
      playlist => playlist.title === playlistTitle,
    );

    return isTitleAlreadyInUse;
  };

  render() {
    const {
      isPlaylistOperationModalOpen,
      isPlaylistTitleAlreadyInUse,
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
            hasError={isPlaylistTitleAlreadyInUse}
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
