// @flow

import React, { Component } from 'react';

import PodcastDetailComponent from './components/PodcastDetailComponent';
import CONSTANTS from '~/utils/CONSTANTS';

type Props = {
  navigation: Object,
};

type State = {
  isPlaylistModalOpen: boolean,
};

class PodcastDetail extends Component<Props, State> {
  state = {
    isAddPlaylistModalOpen: false,
  };

  onToggleAddPlaylistModal = (): void => {
    const { isAddPlaylistModalOpen } = this.state;

    this.setState({
      isAddPlaylistModalOpen: !isAddPlaylistModalOpen,
    });
  };

  onMoveDownloadSwitch = (): void => {};

  getProps = (): void => {
    const { navigation } = this.props;
    const { params } = navigation.state;

    const podcastInfo = params[CONSTANTS.PODCAST_DETAIL_PARAMS];

    return podcastInfo;
  };

  onNavigateAuthorDetail = (id: string): void => {
    const { navigation } = this.props;

    navigation.navigate(CONSTANTS.NAVIGATE_AUTHOR_DETAIL, {
      [CONSTANTS.AUTHOR_DETAIL_PARAMS]: {
        id,
      },
    });
  };

  onPressPlay = (): void => {
    const { navigation } = this.props;
    const podcast = this.getProps();

    navigation.navigate(CONSTANTS.NAVIGATE_PLAYER, {
      [CONSTANTS.PLAYER_PARAMS]: {
        [CONSTANTS.PLAYLIST_KEY]: [podcast],
      },
    });
  };

  onMoveDownloadSwitch = (): void => {};

  render() {
    const { isAddPlaylistModalOpen } = this.state;

    const {
      description,
      uploadedAt,
      imageURL,
      subject,
      author,
      title,
      stars,
      id,
    } = this.getProps();

    return (
      <PodcastDetailComponent
        onNavigateAuthorDetail={() => this.onNavigateAuthorDetail(id)}
        onToggleAddPlaylistModal={this.onToggleAddPlaylistModal}
        onMoveDownloadSwitch={this.onMoveDownloadSwitch}
        onMoveDownloadSwitch={this.onMoveDownloadSwitch}
        isAddPlaylistModalOpen={isAddPlaylistModalOpen}
        onPressPlay={this.onPressPlay}
        isPodcastDownloaded={false}
        description={description}
        uploadedAt={uploadedAt}
        imageURL={imageURL}
        subject={subject}
        author={author}
        title={title}
        stars={stars}
      />
    );
  }
}

export default PodcastDetail;
