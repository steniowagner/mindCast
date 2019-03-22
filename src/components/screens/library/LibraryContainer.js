// @flow

import React, { Component } from 'react';
import LibraryComponent from './components/LibraryComponent';

import { connect } from 'react-redux';
import { Creators as PlaylistsCreators } from '~/store/ducks/playlist';

class LibraryContainer extends Component {
  render() {
    const { playlists } = this.props;

    return <LibraryComponent
      playlists={playlists}
    />;
  }
}

const mapStateToProps = state => ({
  playlists: state.playlist.playlists,
});

export default connect(mapStateToProps)(LibraryContainer);
