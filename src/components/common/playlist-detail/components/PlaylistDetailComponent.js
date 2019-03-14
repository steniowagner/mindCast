// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import Header from './Header';

import Test from './PodcastListItem';

const Container = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.dark};
`;

type Props = {
  onPressPlayAllButton: Function,
  onPressShuffleButton: Function,
  isAvailableOffline: boolean,
  title: string,
};

const PlaylistDetailComponent = ({
  onPressPlayAllButton,
  onPressShuffleButton,
  isAvailableOffline,
  title,
}: Props): Object => (
  <Container>
    <Header
      onPressPlayAllButton={onPressPlayAllButton}
      onPressShuffleButton={onPressShuffleButton}
      isAvailableOffline={isAvailableOffline}
      images={Array(4).fill(
        'https://s3-sa-east-1.amazonaws.com/mind-cast/images/ragnar.jpeg',
      )}
      title={title}
    />
    <Test
      isPodcastDownloaded
    />
  </Container>
);

export default PlaylistDetailComponent;
