// @flow

import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import PlaylistCompositionImages from '~/components/common/PlaylistCompositionImages';
import DefaultButton from '~/components/common/DefaultButton';
import Switch from '~/components/common/Switch';

const Wrapper = styled(View)`
  width: 100%
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const UpperContent = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const BottomContent = styled(View)`
  width: 65%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const ContentWrapper = styled(View)`
  width: 60%;
  padding-left: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const PlaylistTitle = styled(Text).attrs({
  numberOfLines: 3,
})`
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5.35%')}px;
  font-family: CircularStd-Black;
  color: ${({ theme }) => theme.colors.textColor};
  text-align: left;
`;

const AvailableOfflineText = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.1}px;
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.textColor};
`;

const Row = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

type Props = {
  onTogglePlaylistDownloadedSwitch: Function,
  isPlaylistAvailableOffline: boolean,
  onPressPlayAllButton: Function,
  onPressShuffleButton: Function,
  images: Array<string>,
  title: string,
};

const Header = ({
  onTogglePlaylistDownloadedSwitch,
  isPlaylistAvailableOffline,
  onPressPlayAllButton,
  onPressShuffleButton,
  images,
  title,
}: Props): Object => (
  <Wrapper>
    <UpperContent>
      <PlaylistCompositionImages
        images={images}
        size="large"
      />
      <ContentWrapper>
        <PlaylistTitle>{title}</PlaylistTitle>
        <Row>
          <DefaultButton
            onPress={onPressPlayAllButton}
            text="PLAY ALL"
            size="large"
          />
          <DefaultButton
            translucent
            onPress={onPressShuffleButton}
            text="SHUFFLE"
            size="large"
          />
        </Row>
      </ContentWrapper>
    </UpperContent>
    <BottomContent>
      <AvailableOfflineText>Available Offline</AvailableOfflineText>
      <Switch
        onToggle={onTogglePlaylistDownloadedSwitch}
        value={isPlaylistAvailableOffline}
      />
    </BottomContent>
  </Wrapper>
);

export default Header;
