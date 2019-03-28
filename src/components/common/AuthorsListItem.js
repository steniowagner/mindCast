// @flow

import React from 'react';
import { Platform, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import DefaultButton from '~/components/common/DefaultButton';

const Wrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('60%')}px;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
  padding: ${({ theme }) => theme.metrics.mediumSize}px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.lightSecondaryColor};
`;

const AuthorImage = styled(FastImage).attrs(({ uri }) => ({
  source: { uri },
}))`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('25%')}px;
  height: 100%;
  border-radius: 4px;
`;

const TextContent = styled(View)`
  height: 100%;
  width: 70%;
  justify-content: space-between;
  padding-left: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const AuthorName = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.metrics.extraLargeSize * 1.2}px;
  font-family: CircularStd-Bold;
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
`;

const AuthorAbout = styled(Text).attrs({
  numberOfLines: 4,
})`
  color: ${({ theme }) => theme.colors.subTextWhite};
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Medium;
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const NumberPodcasts = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.2}px;
  font-family: CircularStd-Bold;
`;

const BottomContent = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

type AuthorProps = {
  numberPodcasts: number,
  imageURL: string,
  about: string,
  name: string,
};

type Props = {
  podcastImage: string,
  author: AuthorProps,
  onPress: Function,
};

const AuthorsListItem = ({ podcastImage, onPress, author }: Props): Object => (
  <Wrapper>
    <AuthorImage
      uri={podcastImage}
    />
    <TextContent>
      <AuthorName>{author.name}</AuthorName>
      <AuthorAbout>{author.about}</AuthorAbout>
      <BottomContent>
        <NumberPodcasts>
          {`${author.numberPodcasts} ${
            author.numberPodcasts === 1 ? 'Podcast' : 'Podcasts'
          }`}
        </NumberPodcasts>
        <DefaultButton
          onPress={onPress}
          text="LEARN MORE"
          size="small"
        />
      </BottomContent>
    </TextContent>
  </Wrapper>
);

export default AuthorsListItem;
