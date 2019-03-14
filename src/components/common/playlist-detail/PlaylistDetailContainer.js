// @flow

import React, { Component } from 'react';

import PlaylistDetailComponent from './components/PlaylistDetailComponent';

class PlaylistDetailContainer extends Component {
  onPressPlayAllButton = (): void => {};

  onPressShuffleButton = (): void => {};

  render() {
    return (
      <PlaylistDetailComponent
        onPressPlayAllButton={this.onPressPlayAllButton}
        onPressShuffleButton={this.onPressShuffleButton}
        isAvailableOffline
        title="Understanding the World and the Humans"
      />
    );
  }
}

export default PlaylistDetailContainer;
