// @flow

import React from 'react';
import { ScrollView, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import ActionButtons from './ActionButtons';
import BottomContent from './BottomContent';
import PodcastInfo from './PodcastInfo';

const Wrapper = styled(ScrollView)`
  width: 100%;
  height: 100%;
  flex: 1;
  padding: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.dark};
`;

type AuthorProps = {
  smallImageURL: string,
  name: string,
  id: string,
};

type Props = {
  onNavigateAuthorDetail: Function,
  onMoveDownloadSwitch: Function,
  isPodcastDownloaded: boolean,
  onPressPlay: Function,
  author: AuthorProps,
  description: string,
  uploadedAt: string,
  imageURL: string,
  subject: string,
  title: string,
  stars: number,
};

const PodcastDetailComponent = ({
  onNavigateAuthorDetail,
  onMoveDownloadSwitch,
  isPodcastDownloaded,
  onPressPlay,
  description,
  uploadedAt,
  imageURL,
  subject,
  author,
  stars,
  title,
}: Props): Object => (
  <Wrapper
    showsVerticalScrollIndicator={false}
    alwaysBounceVertical={false}
  >
    <PodcastInfo
      imageURL={imageURL}
      subject={subject}
      title={title}
      stars={stars}
    />
    <ActionButtons
      onPressAddToPlaylist={this.onToggleAddPlaylistModal}
      onMoveDownloadSwitch={onMoveDownloadSwitch}
      isPodcastDownloaded={isPodcastDownloaded}
      onPressPlay={onPressPlay}
    />
    <BottomContent
      onPressLearnMore={onNavigateAuthorDetail}
      authorImageURL={author.smallImageURL}
      description={description}
      authorName={author.name}
      uploadedAt={uploadedAt}
    />
  </Wrapper>
);

export default PodcastDetailComponent;
