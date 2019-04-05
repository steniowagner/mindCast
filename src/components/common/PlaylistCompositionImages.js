// @flow

import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import Icon from '~/components/common/Icon';
import appStyles from '~/styles';

const LARGE_SIZE = appStyles.metrics.getWidthFromDP('36.05%');
const SMALL_SIZE = appStyles.metrics.getWidthFromDP('18.05%');

const Wrapper = styled(View)`
  width: ${({ theme, size }) => (size === 'large' ? LARGE_SIZE : SMALL_SIZE)}px;
  height: ${({ theme, size }) => (size === 'large' ? LARGE_SIZE : SMALL_SIZE)}px;
  background-color: ${({ theme }) => theme.colors.textColor};
  border-radius: 5px;
  flex-wrap: wrap;
`;

const PodcastImage = styled(FastImage).attrs(({ uri }) => ({
  source: { uri },
}))`
  width: ${({ theme, size }) => (size === 'large' ? LARGE_SIZE / 2 : SMALL_SIZE / 2)}px;
  height: ${({ theme, size }) => (size === 'large' ? LARGE_SIZE / 2 : SMALL_SIZE / 2)}px;
  border-top-left-radius: ${({ index, theme }) => (index === 0 ? 5 : 0)}px;
  border-top-right-radius: ${({ index, theme }) => (index === 2 ? 5 : 0)}px;
  border-bottom-left-radius: ${({ index, theme }) => (index === 1 ? 5 : 0)}px;
  border-bottom-right-radius: ${({ index, theme }) => (index === 3 ? 5 : 0)}px;
`;

const PodcastIconWrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

type Props = {
  images: Array<string>,
  size: string,
};

const PlaylistCompositionImages = ({ images, size }: Props): Object => (
  <Wrapper
    size={size}
  >
    {images.length === 0 && (
      <PodcastIconWrapper>
        <Icon
          color={appStyles.colors.primaryColor}
          name="headphones"
          size={28}
        />
      </PodcastIconWrapper>
    )}
    {images.length > 0
      && images.map((url, index) => (
        <PodcastImage
          index={index}
          size={size}
          key={`${url}${index}`}
          uri={url}
        />
      ))}
  </Wrapper>
);

export default PlaylistCompositionImages;
