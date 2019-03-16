// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlaylistCreators } from '~/store/ducks/playlist';

import PlaylistDetailComponent from './components/PlaylistDetailComponent';
import { CustomAlert, TYPES } from '~/components/common/Alert';
import CONSTANTS from '~/utils/CONSTANTS';

type State = {
  isPlaylistAvailableOffline: boolean,
};

type Playlist = {
  isAvailableOffline: boolean,
  dowloads: Array<string>,
  podcasts: Array<Object>,
  title: string,
};

type Props = {
  getPlaylist: Function,
  navigation: Object,
  playlist: Playlist,
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

class PlaylistDetailContainer extends Component<Props, State> {
  state = {
    isPlaylistAvailableOffline: false,
  };

  componentDidMount() {
    const { getPlaylist, navigation } = this.props;
    const { params } = navigation.state;

    const playlistTitle = params[CONSTANTS.PARAMS.PLAYLIST_TITLE];

    getPlaylist(playlistTitle);
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
    let images = [];

    if (podcasts) {
      images = podcasts.slice(0, 4).map(podcast => podcast.imageURL);
    }

    return images;
  };

  render() {
    const { isPlaylistAvailableOffline } = this.state;
    const { playlist } = this.props;

    const {
      isAvailableOffline, dowloads, podcasts, title,
    } = playlist;

    const podcastsImages = this.getPodcastsImages(podcasts);

    return (
      <PlaylistDetailComponent
        onTogglePlaylistDownloadedSwitch={this.onTogglePlaylistDownloadedSwitch}
        onRemovePodcastFromPlaylist={this.onRemovePodcastFromPlaylist}
        isPlaylistAvailableOffline={isAvailableOffline}
        onPressPlayAllButton={this.onPressPlayAllButton}
        onPressShuffleButton={this.onPressShuffleButton}
        podcastsImages={podcastsImages}
        podcasts={podcasts}
        title={title}
      />
    );
  }
}

const mapStateToProps = state => ({
  playlist: state.playlist.playlist,
});

const mapDispatchToProps = dispatch => bindActionCreators(PlaylistCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaylistDetailContainer);
