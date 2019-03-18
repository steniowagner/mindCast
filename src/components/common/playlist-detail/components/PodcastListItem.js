// @flow

import React from 'react';
import {
  ActivityIndicator, TouchableOpacity, View, Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Swipeout from 'react-native-swipeout';
import styled from 'styled-components';

import Loading from '~/components/common/Loading';
import Icon from '~/components/common/Icon';
import appStyles from '~/styles';

const Wrapper = styled(View)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.dark};
`;

const PodcastImage = styled(FastImage).attrs(({ uri }) => ({
  source: { uri },
}))`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('16.5%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('16.5%')}px;
  margin-left: ${({ theme }) => theme.metrics.mediumSize}px;
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
  margin-left: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.subTextWhite};
`;

const SwipeDeleteButton = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primaryColor};
`;

const IconWrapper = styled(View)`
  width: 24px;
  height: 25px;
  justify-content: center;
  align-items: center;
`;

type Props = {
  isPodcastDownloaded: boolean,
  isDownloading: boolean,
  authorName: string,
  onPress: Function,
  imageURL: string,
  isLast: boolean,
  title: string,
};

const renderStatusIcon = (isPodcastDownloaded, isDownloading): Object => {
  if (isDownloading) {
    return (
      <ActivityIndicator
        color={appStyles.colors.primaryColor}
        size="small"
      />
    );
  }

  return (
    <Icon
      size={22}
      name={isPodcastDownloaded ? 'cloud-check' : 'cloud-download-outline'}
      color={
        isPodcastDownloaded
          ? appStyles.colors.primaryColor
          : appStyles.colors.white
      }
    />
  );
};

const PodcastListItem = ({
  isPodcastDownloaded,
  isDownloading,
  authorName,
  imageURL,
  onPress,
  isLast,
  title,
}: Props): Object => (
  <Wrapper>
    <Swipeout
      autoClose
      backgroundColor={appStyles.colors.dark}
      right={[
        {
          component: (
            <SwipeDeleteButton>
              <Icon
                color={appStyles.colors.white}
                name="trash-can-outline"
                size={25}
              />
            </SwipeDeleteButton>
          ),
          type: 'delete',
          onPress,
        },
      ]}
    >
      <TouchableOpacity>
        <RowWrapper>
          <PodcastImage
            uri={imageURL}
          />
          <TextContentWrapper>
            <PodcastTitle>{title}</PodcastTitle>
            <RowWrapper>
              <IconWrapper>
                {renderStatusIcon(isPodcastDownloaded, isDownloading)}
              </IconWrapper>
              <AuthorName>{authorName}</AuthorName>
            </RowWrapper>
          </TextContentWrapper>
        </RowWrapper>
      </TouchableOpacity>
    </Swipeout>
    {!isLast && <BottomLine />}
  </Wrapper>
);

export default PodcastListItem;
