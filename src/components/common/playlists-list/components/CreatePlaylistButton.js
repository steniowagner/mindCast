// @flow

import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components';

import CreatePlaylistAlert from '~/components/screens/library/components/playlists/PlaylistOperationModal';
import CreatePlaylist from '~/components/common/DefaultButton';

const Wrapper = styled(View)`
  width: 100%;
  justify-content: center;
  align-items: center
  align-self: center;
  margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('30%')}px;
`;

const DefaultText = styled(Text)`
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.textColor};
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

type Props = {
  createPlaylist: Function,
};

type State = {
  playlistTitle: string,
  isModalOpen: boolean,
};

class CreatePlaylistButton extends Component<Props, State> {
  state = {
    isModalOpen: false,
    playlistTitle: '',
  };

  onCreatePlaylist = (iosTitle: ?string): void => {
    const { createPlaylist } = this.props;
    const { playlistTitle } = this.state;

    const title = iosTitle || playlistTitle;

    if (title) {
      createPlaylist(title);
    }

    this.setState({
      isModalOpen: false,
    });
  };

  onToggleModal = (): void => {
    const { isModalOpen } = this.state;

    this.setState({
      isModalOpen: !isModalOpen,
    });
  };

  onTypePlaylistTitle = (playlistTitle: string): void => {
    this.setState({
      playlistTitle,
    });
  };

  render() {
    const { playlistTitle, isModalOpen } = this.state;

    return (
      <Wrapper>
        <DefaultText>There's no Playlists created.</DefaultText>
        <TouchableOpacity>
          <CreatePlaylist
            onPress={this.onToggleModal}
            size="large"
            text="CREATE A NEW PLAYLIST"
          />
        </TouchableOpacity>
        {isModalOpen && (
          <CreatePlaylistAlert
            onTypePlaylistTitle={this.onTypePlaylistTitle}
            mainAction={this.onCreatePlaylist}
            toggleModal={this.onToggleModal}
            playlistTitle={playlistTitle}
            hasError={false}
            mode="Create"
          />
        )}
      </Wrapper>
    );
  }
}

export default CreatePlaylistButton;
