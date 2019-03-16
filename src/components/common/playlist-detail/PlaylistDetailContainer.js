// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlaylistCreators } from '~/store/ducks/playlist';

import PlaylistDetailComponent from './components/PlaylistDetailComponent';
import { CustomAlert, TYPES } from '~/components/common/Alert';

type State = {
  isPlaylistAvailableOffline: boolean,
};

type Props = {
  getPlaylists: Function,
};

const PODCASTS = Array(25)
  .fill({})
  .map((item, index) => ({
    id: index,
    imageURL: 'https://s3-sa-east-1.amazonaws.com/mind-cast/images/ragnar.jpeg',
    title: 'How solve puzzles',
    authorName: 'Alan Turing',
    isPodcastDownloaded: index % 2 === 0,
  }));

class PlaylistDetailContainer extends Component<{}, State> {
  state = {
    isPlaylistAvailableOffline: false,
  };

  componentDidMount() {
    this.setState({
      isPlaylistAvailableOffline: true,
    });
  }

  onPressPlayAllButton = (): void => {};

  onPressShuffleButton = (): void => {};

  onTogglePlaylistDownloadedSwitch = (): void => {
    const { isPlaylistAvailableOffline } = this.state;

    this.setState({
      isPlaylistAvailableOffline: !isPlaylistAvailableOffline,
    });
  };

  onRemovePodcastFromPlaylist = (id: string) => {
    CustomAlert(TYPES.REMOVE_PODCAST_FROM_PLAYLIST, () => console.tron.log('remove', id));
  };

  getPodcastsImages = (podcasts: Array<Object>): Array<string> => {
    const images = podcasts.slice(0, 4).map(podcast => podcast.imageURL);

    return images;
  };

  render() {
    const { isPlaylistAvailableOffline } = this.state;

    const podcastsImages = this.getPodcastsImages(PODCASTS);

    return (
      <PlaylistDetailComponent
        onTogglePlaylistDownloadedSwitch={this.onTogglePlaylistDownloadedSwitch}
        onRemovePodcastFromPlaylist={this.onRemovePodcastFromPlaylist}
        isPlaylistAvailableOffline={isPlaylistAvailableOffline}
        onPressPlayAllButton={this.onPressPlayAllButton}
        onPressShuffleButton={this.onPressShuffleButton}
        title="Understanding the World and the Humans"
        podcastsImages={podcastsImages}
        podcasts={PODCASTS}
      />
    );
  }
}

const mapStateToProps = state => ({
  playlists: state.playlist,
});

const mapDispatchToProps = dispatch => bindActionCreators(PlaylistCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaylistDetailContainer);
