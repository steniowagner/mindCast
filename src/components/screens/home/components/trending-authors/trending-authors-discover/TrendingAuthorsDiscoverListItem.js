// @flow

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import DefaultButton from '~/components/common/DefaultButton';

const Wrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('40%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('64%')}px;
  justify-content: space-between;
  align-items: center;
  margin-left: ${({ theme }) => theme.metrics.largeSize}px;
  margin-right: ${({ theme, isLastIndex }) => (isLastIndex ? theme.metrics.largeSize : 0)}px;
  padding-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.lightSecondaryColor};
  border-radius: 4px;
`;

const ButtonWrapper = styled(View)`
  justify-content: center;
  align-items: center;
`;

const TextContent = styled(View)`
  width: 85%;
  align-items: center;
  justify-content: center;
`;

const AuthorImage = styled(FastImage).attrs(({ uri }) => ({
  source: { uri },
}))`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('18%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('18%')}px;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('9%')}px;
  align-self: center;
`;

const AuthorName = styled(Text).attrs({
  numberOfLines: 2,
})`
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.05}px;
  color: ${({ theme }) => theme.colors.white};
  font-family: CircularStd-Bold;
  text-align: center;
`;

const NumberOfPodcasts = styled(Text).attrs({
  numberOfLines: 1,
})`
  margin-top: ${({ theme }) => theme.metrics.smallSize}px;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.subTextWhite};
  font-family: CircularStd-Bold;
  text-align: center;
`;

type AuthorProps = {
  numberPodcasts: number,
  imageURL: string,
  name: string,
  id: string,
};

type Props = {
  isLastIndex: boolean,
  author: AuthorProps,
  onPress: Function,
};

const TrendingAuthorsListItem = ({
  isLastIndex,
  onPress,
  author,
}: Props): Object => (
  <Wrapper
    isLastIndex={isLastIndex}
  >
    <AuthorImage
      uri={author.imageURL}
    />
    <TextContent>
      <AuthorName>{author.name}</AuthorName>
      <NumberOfPodcasts>
        {`${author.numberPodcasts} ${
          author.numberPodcasts === 1 ? 'Podcast' : 'Podcasts'
        }`}
      </NumberOfPodcasts>
    </TextContent>
    <ButtonWrapper>
      <DefaultButton
        onPress={onPress}
        text="LEARN MORE"
        size="small"
      />
    </ButtonWrapper>
  </Wrapper>
);

export default TrendingAuthorsListItem;
