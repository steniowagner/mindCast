// @flow

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components';
import FastImage from 'react-native-fast-image';

import Icon from '~/components/common/Icon';
import appStyles from '~/styles';

const Wrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('15%')}px;
  flex-direction: row;
  align-items: center;
  padding-left: ${({ theme }) => theme.metrics.smallSize}px;
  padding-right: ${({ theme }) => theme.metrics.largeSize}px;
`;

const TextWrapper = styled(View)`
  width: 60%;
  height: 100%;
  justify-content: center;
  padding-horizontal: ${({ theme }) => theme.metrics.smallSize}px;
`;

const ThumbanailImage = styled(FastImage).attrs(({ uri }) => ({
  source: { uri },
}))`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('25%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('25%')}px;
  border-radius: 6px;
`;

const CloseIconWrapper = styled(View)`
  width: 10%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Title = styled(Text).attrs({
  numberOfLines: 2,
})`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-family: CircularStd-Black;
`;

const Author = styled(Text).attrs({
  numberOfLines: 2,
})`
  margin-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
  color: ${({ theme }) => theme.colors.primaryColor};
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Bold;
`;

const renderTextContent = (author: string, title: string): Object => (
  <TextWrapper>
    <Title>{title}</Title>
    <Author>{author}</Author>
  </TextWrapper>
);

const renderCloseIcon = (removeFromPlaylist: Function, id: string): Object => (
  <CloseIconWrapper>
    <TouchableOpacity
      onPress={() => removeFromPlaylist(id)}
      hitSlop={{
        bottom: appStyles.metrics.smallSize,
        right: appStyles.metrics.smallSize,
        left: appStyles.metrics.smallSize,
        top: appStyles.metrics.smallSize,
      }}
    >
      <Icon
        name="close"
        size={20}
      />
    </TouchableOpacity>
  </CloseIconWrapper>
);

type AuthorProps = {
  name: string,
};

type PodcastProps = {
  thumbnailImageURL: string,
  author: AuthorProps,
  title: string,
  id: string,
};

type Props = {
  removeFromPlaylist: Function,
  podcast: PodcastProps,
};

const NextPodcastListItem = ({
  podcast,
  removeFromPlaylist,
}: Props): Object => {
  const {
    thumbnailImageURL, author, title, id,
  } = podcast;

  return (
    <Wrapper>
      <ThumbanailImage
        uri={thumbnailImageURL}
      />
      {renderTextContent(author.name, title)}
      {renderCloseIcon(removeFromPlaylist, id)}
    </Wrapper>
  );
};

export default NextPodcastListItem;
