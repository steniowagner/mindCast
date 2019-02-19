// @flow

import React, { Component } from 'react';
import { View, Text, Slider } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlayerCreators } from '~/store/ducks/player';

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

  componentWillReceiveProps(nextProps) {
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
          paddingBottom: 40,
          backgroundColor: '#000',
        }}
      >
        <View
          style={{
            width: '100%',
            height: 80,
            backgroundColor: '#AAA',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>{currentPodcast.uri}</Text>
        </View>
        <Slider
          onSlidingComplete={value => this.onSlidingComplete(value)}
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
          <Text
            style={{
              color: '#fff',
            }}
          >
            {currentTime}
          </Text>
          <Text
            style={{
              color: '#fff',
            }}
          >
            {duration}
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player,
});

const mapDispatchToProps = dispatch => bindActionCreators(PlayerCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProgressSlider);
