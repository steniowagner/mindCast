// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import ScreenTitle from '~/components/common/ScreenTitle';
import Playlists from './components/playlists/Playlists';
import Sections from './components/sections/Sections';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.dark};
`;

type Props = {
  navigation: Object,
};

const Library = ({ navigation }: Props): Object => (
  <Wrapper>
    <ScreenTitle
      title="Library"
    />
    <Sections
      navigation={navigation}
    />
    <Playlists
      navigation={navigation}
    />
  </Wrapper>
);

export default Library;

// // @flow

// import React, { Component, Fragment } from 'react';

// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { Creators as PlaylistsCreators } from '~/store/ducks/playlist';

// import PlaylistOperationModal, {
//   OPERATIONS,
// } from './components/PlaylistOperationModal';
// import { CustomAlert, TYPES } from '~/components/common/Alert';
// import CONSTANTS from '~/utils/CONSTANTS';
// import { ROUTE_NAMES } from './routes';

// type Playlist = {
//   isAvailableOffline: boolean,
//   dowloads: Array<string>,
//   podcasts: Array<Object>,
//   title: string,
// };

// type Props = {
//   podcastsDownloaded: Array<Object>,
//   playlists: Array<Playlist>,
//   removePlaylist: Function,
//   createPlaylist: Function,
//   editPlaylist: Function,
//   navigation: Object,
// };

// type State = {
//   isPlaylistOperationModalOpen: boolean,
//   isPlaylistTitleAlreadyInUse: boolean,
//   indexPlaylistToEdit: number,
//   playlistTitle: string,
//   modalMode: string,
// };

// class LibraryContainer extends Component<Props, State> {
//   state = {
//     isPlaylistOperationModalOpen: false,
//     isPlaylistTitleAlreadyInUse: false,
//     indexPlaylistToEdit: 0,
//     playlistTitle: '',
//     modalMode: '',
//   };

//

//   render() {
//     const {
//       isPlaylistOperationModalOpen,
//       isPlaylistTitleAlreadyInUse,
//       playlistTitle,
//       modalMode,
//     } = this.state;

//     const { podcastsDownloaded, playlists } = this.props;

//     const isModalCreationMode = modalMode === OPERATIONS.CREATE;

//     return (
//       <Fragment>
//         <LibraryComponent
//           onTogglePlaylistOperationModal={this.onTogglePlaylistOperationModal}
//           isPlaylistOperationModalOpen={isPlaylistOperationModalOpen}
//           onPressPlaylistItem={this.onPressPlaylistItem}
//           onRemovePlaylist={this.onRemovePlaylist}
//           podcastsDownloaded={podcastsDownloaded}
//           onEditPlaylist={this.onEditPlaylist}
//           modalOperations={OPERATIONS}
//           navigation={this.props.navigation}
//           playlists={playlists}
//         />
//         {isPlaylistOperationModalOpen && (
//           <PlaylistOperationModal
//             mainAction={
//               isModalCreationMode ? this.onCreatePlaylist : this.onEditPlaylist
//             }
//             onToggleModal={this.onTogglePlaylistOperationModal}
//             onTypePlaylistTitle={this.onTypePlaylistTitle}
//             hasError={isPlaylistTitleAlreadyInUse}
//             playlistTitle={playlistTitle}
//             modalMode={modalMode}
//           />
//         )}
//       </Fragment>
//     );
//   }
// }

// const mapDispatchToProps = dispatch => bindActionCreators(PlaylistsCreators, dispatch);

// const mapStateToProps = state => ({
//   podcastsDownloaded: state.localPodcastsManager.podcastsDownloaded,
//   playlists: state.playlist.playlists,
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(LibraryContainer);
