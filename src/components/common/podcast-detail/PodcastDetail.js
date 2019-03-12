// @flow

import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import ActionButtons from './components/ActionButtons';
import BottomContent from './components/BottomContent';
import PodcastInfo from './components/PodcastInfo';

const Wrapper = styled(ScrollView)`
  width: 100%;
  height: 100%;
  flex: 1;
  padding: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.dark};
`;

type Props = {
  navigation: Object,
};

type State = {
  isPlaylistModalOpen: boolean,
};

class PodcastDetail extends Component<{}, State> {
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

  render() {
    return (
      <Wrapper
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
      >
        <PodcastInfo
          imageURL="https://s3-sa-east-1.amazonaws.com/mind-cast/images/ragnar.jpeg"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          subject="literature"
          stars={4.5}
        />
        <ActionButtons
          onMoveDownloadSwitch={() => {}}
          onPressAddToPlaylist={this.onToggleAddPlaylistModal}
          onPressPlay={() => {}}
          isPodcastDownloaded
        />
        <BottomContent
          description="Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s."
          authorImageURL="https://s3-sa-east-1.amazonaws.com/mind-cast/images/ragnar.jpeg"
          authorName="Stenio Wagner"
          uploadedAt="21/02/1994"
          onPressLearnMore={() => {}}
        />
      </Wrapper>
    );
  }
}

export default PodcastDetail;
