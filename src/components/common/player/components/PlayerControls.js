// @flow

import React, { PureComponent } from 'react';
import { TouchableOpacity, Platform, View } from 'react-native';
import styled from 'styled-components';

import Icon from '~/components/common/Icon';
import appStyles from '~/styles';

const Container = styled(View)`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const PlayOutterCircle = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('20%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('20%')}px;
  justify-content: center;
  align-items: center;
  margin-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('12%')}px;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
  background-color: ${({ theme }) => theme.colors.primaryColorAlpha};
`;

const PlayInnerCircleButton = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('15%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('15%')}px;
  padding-top: ${Platform.OS === 'ios' ? 2 : 0}px;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('7.5%')}px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
`;

type Props = {
  playPrevious: Function,
  playNext: Function,
  paused: boolean,
  pause: Function,
  play: Function,
};

class PlayerControls extends PureComponent<Props, {}> {
  renderCenterButton = (
    paused: boolean,
    pause: Function,
    play: Function,
    iconSize: number,
  ): Object => {
    const { onPress, iconName } = paused
      ? { onPress: play, iconName: 'play' }
      : { onPress: pause, iconName: 'pause' };

    return (
      <PlayOutterCircle>
        <PlayInnerCircleButton
          onPress={onPress}
        >
          <Icon
            name={iconName}
            size={iconSize}
          />
        </PlayInnerCircleButton>
      </PlayOutterCircle>
    );
  };

  renderSideButton = (
    iconName: string,
    action: Function,
    iconSize: number,
  ): Object => (
    <TouchableOpacity
      onPress={action}
      hitSlop={{
        bottom: appStyles.metrics.smallSize,
        right: appStyles.metrics.smallSize,
        left: appStyles.metrics.smallSize,
        top: appStyles.metrics.smallSize,
      }}
    >
      <Icon
        name={iconName}
        size={iconSize}
      />
    </TouchableOpacity>
  );

  render() {
    const {
      playPrevious, playNext, paused, pause, play,
    } = this.props;

    const iconSize = appStyles.metrics.getWidthFromDP('9%');

    return (
      <Container>
        <Wrapper>
          {this.renderSideButton('rewind', playPrevious, iconSize)}
          {this.renderCenterButton(paused, pause, play, iconSize)}
          {this.renderSideButton('fast-forward', playNext, iconSize)}
        </Wrapper>
      </Container>
    );
  }
}

export default PlayerControls;
