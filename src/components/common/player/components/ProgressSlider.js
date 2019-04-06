// @flow

import React, { Component } from 'react';
import { View, Text, Slider } from 'react-native';
import styled from 'styled-components';

import appStyles from '~/styles';

const TimerText = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
`;

type PlayerProps = {
  shouldSeekProgressSlider: boolean,
  currentTimeInSeconds: number,
  currentPodcast: Object,
  currentTime: string,
};

type Props = {
  seekProgressTimer: Function,
  player: PlayerProps,
};

type State = {
  isSliding: boolean,
  slideValue: number,
};

class ProgressSlider extends Component<Props, State> {
  state = {
    isSliding: false,
    slideValue: 0,
  };

  componentWillReceiveProps(nextProps: Props) {
    const { player } = nextProps;
    const { shouldSeekProgressSlider, currentTime } = player;

    const { isSliding } = this.state;

    if (isSliding || shouldSeekProgressSlider) {
      return;
    }

    const rawMinutes = currentTime.split(':')[0];
    const rawSeconds = currentTime.split(':')[1];

    const minutes = parseInt(rawMinutes, 10);
    const seconds = parseInt(rawSeconds, 10);

    const currentTimeInSeconds = minutes * 60 + seconds;

    this.setState({
      slideValue: currentTimeInSeconds,
    });
  }

  onSlidingComplete = (slideValue: number): void => {
    const { seekProgressTimer } = this.props;

    this.setState({ isSliding: false, slideValue }, () => seekProgressTimer(slideValue));
  };

  onValueChange = (slideValue: number): void => {
    this.setState({
      isSliding: true,
      slideValue,
    });
  };

  render() {
    const { slideValue } = this.state;
    const { player } = this.props;

    const { currentPodcast, currentTime } = player;
    const { totalDurationInSeconds, duration } = currentPodcast;

    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alginItems: 'center',
          paddingHorizontal: 20,
        }}
      >
        <Slider
          onSlidingComplete={value => this.onSlidingComplete(value)}
          minimumTrackTintColor={appStyles.colors.primaryColor}
          thumbTintColor={appStyles.colors.primaryColor}
          onValueChange={value => this.onValueChange(value)}
          maximumValue={totalDurationInSeconds}
          value={slideValue}
          minimumValue={0}
          step={1}
        />
        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          <TimerText>{currentTime}</TimerText>
          <TimerText>{duration}</TimerText>
        </View>
      </View>
    );
  }
}

export default ProgressSlider;
