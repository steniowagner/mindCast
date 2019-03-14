// @flow

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import Icon from '~/components/common/Icon';
import appStyles from '~/styles';

const Wrapper = styled(View)`
  width: 100%;
  padding-left: ${({ theme }) => theme.metrics.largeSize}px;
`;

const PodcastImage = styled(FastImage).attrs(({ uri }) => ({
  source: { uri },
}))`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('16.5%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('16.5%')}px;
  border-radius: 5px;
`;

const RowWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const TextContentWrapper = styled(View)`
  width: 75%;
  justify-content: center;
  margin-left: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const PodcastTitle = styled(Text).attrs({
  numberOfLines: 2,
})`
  margin-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.metrics.largeSize};
  font-family: CircularStd-Bold;
`;

const AuthorName = styled(Text).attrs({
  numberOfLines: 1,
})`
  width: 80%;
  color: ${({ theme }) => theme.colors.subTextWhite};
  font-size: ${({ theme }) => theme.metrics.mediumSize * 1.2};
  margin-left: ${({ theme }) => theme.metrics.smallSize}px;
  font-family: CircularStd-Medium;
`;

const BottomLine = styled(View)`
  width: 100%;
  height: 1px;
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.subTextWhite};
`;

const PodcastListItem = ({ isPodcastDownloaded }): Object => (
  <Wrapper>
    <TouchableOpacity>
      <RowWrapper>
        <PodcastImage
          uri="https://s3-sa-east-1.amazonaws.com/mind-cast/images/ragnar.jpeg"
        />
        <TextContentWrapper>
          <PodcastTitle>
            How solve Puzzles can make you a better developer
          </PodcastTitle>
          <RowWrapper>
            <Icon
              size={22}
              name={
                isPodcastDownloaded ? 'cloud-download-outline' : 'cloud-check'
              }
              color={
                isPodcastDownloaded
                  ? appStyles.colors.primaryColor
                  : appStyles.colors.white
              }
            />
            <AuthorName>Stenio Wagner</AuthorName>
          </RowWrapper>
        </TextContentWrapper>
      </RowWrapper>
    </TouchableOpacity>
    <BottomLine />
  </Wrapper>
);

export default PodcastListItem;
