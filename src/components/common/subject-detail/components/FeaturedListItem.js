// @flow

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components';
import FastImage from 'react-native-fast-image';

import ReviewStars from '~/components/common/ReviewStars';
import AuthorInfo from './AuthorInfo';

const Wrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('20%')}px;
  margin-top: ${({ theme, isFirst }) => (isFirst ? theme.metrics.largeSize : 0)}px;
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const PodcastImage = styled(FastImage).attrs(({ uri }) => ({
  source: { uri },
}))`
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;

const Button = styled(TouchableOpacity)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.darkLayer};
  padding-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  border-radius: 4px;
`;

const UpperContent = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PodcastTitle = styled(Text).attrs({
  numberOfLines: 2,
})`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.35}px;
  font-family: CircularStd-Black;
`;

type AuthorProps = {
  thumbnailImageURL: string,
  name: string,
};

type Props = {
  podcastImage: string,
  author: AuthorProps,
  isFirst: boolean,
  stars: number,
  title: string,
};

const FeaturedListitem = ({
  podcastImage,
  author,
  stars,
  title,
  isFirst,
}: Props): Object => (
  <Wrapper
    isFirst={isFirst}
  >
    <Button>
      <PodcastImage
        uri={podcastImage}
      />
      <DarkLayer>
        <UpperContent>
          <ReviewStars
            shouldShowReviewsText={false}
            isSmall={false}
            stars={stars}
          />
          <AuthorInfo
            imageURL={author.thumbnailImageURL}
            name={author.name}
            textColor="white"
          />
        </UpperContent>
        <PodcastTitle>{title}</PodcastTitle>
      </DarkLayer>
    </Button>
  </Wrapper>
);

export default FeaturedListitem;
