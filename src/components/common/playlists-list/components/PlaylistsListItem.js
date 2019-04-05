// @flow

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components';

import PlaylistCompositionImages from '../../PlaylistCompositionImages';
import DefaultButton from '../../DefaultButton';
import appStyles from '~/styles';
import Icon from '../../Icon';

const Wrapper = styled(TouchableOpacity)`
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize * 1.2}px;
`;

const ContentWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const TextWrapper = styled(View)`
  width: 70%;
  margin-left: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const BottomContentWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const PlaylistTitle = styled(Text).attrs({
  numberOfLines: 3,
})`
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5.35%')}px;
  font-family: CircularStd-Black;
  color: ${({ theme }) => theme.colors.textColor};
`;

const NumberPodcasts = styled(Text)`
  margin-right: ${({ theme }) => theme.metrics.smallSize}px;
  color: ${({ theme }) => theme.colors.subTextWhite};
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.1}px;
  font-family: CircularStd-Bold;
`;

const BottomLine = styled(View)`
  width: 100%;
  height: 1.5px;
  margin-top: ${({ theme }) => theme.metrics.smallSize}px;
  background-color: ${({ theme }) => theme.colors.subTextWhite};
`;

type Props = {
  numberOfPodcasts: number,
  isDownloaded: boolean,
  images: Array<string>,
  onPress: Function,
  title: string,
};

const PlaylistListItem = ({
  numberOfPodcasts,
  isDownloaded,
  onPress,
  images,
  title,
}: Props): Object => (
  <Wrapper
    onPress={onPress}
  >
    <ContentWrapper>
      <PlaylistCompositionImages
        images={images}
        size="large"
      />
      <TextWrapper>
        <PlaylistTitle>{title}</PlaylistTitle>
        <BottomContentWrapper>
          <NumberPodcasts>
            {`${numberOfPodcasts} ${
              numberOfPodcasts === 1 ? 'Podcast' : 'Podcasts'
            }`}
          </NumberPodcasts>
          <Icon
            color={
              isDownloaded
                ? appStyles.colors.primaryColor
                : appStyles.colors.subTextWhite
            }
            name={isDownloaded ? 'cloud-check' : 'cloud-download-outline'}
            size={22}
          />
        </BottomContentWrapper>
      </TextWrapper>
    </ContentWrapper>
  </Wrapper>
);

export default PlaylistListItem;
