// @flow

import React, { Component } from 'react';
import { View, Animated } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import appStyles from '~/styles';

const Wrapper = styled(View)`
  align-items: center;
  margin: 0 ${({ theme }) => theme.metrics.extraSmallSize}px;
  width: 30px;
`;

const HeartIcon = Animated.createAnimatedComponent(Icon);

class HeartBeating extends Component {
  _heartSize = new Animated.Value(20);

  componentDidMount() {
    this.beatHeart();
  }

  beatHeart = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this._heartSize, {
          toValue: 30,
          duration: 100,
        }),

        Animated.timing(this._heartSize, {
          toValue: 25,
          duration: 100,
        }),

        Animated.timing(this._heartSize, {
          toValue: 30,
          duration: 100,
        }),

        Animated.timing(this._heartSize, {
          toValue: 25,
          duration: 200,
        }),

        Animated.delay(700),
      ]),
    ).start();
  };

  render() {
    return (
      <Wrapper>
        <HeartIcon
          name="heart"
          style={{
            fontSize: this._heartSize,
            color: appStyles.colors.primaryColor,
          }}
          size={this._heartSize}
        />
      </Wrapper>
    );
  }
}

export default HeartBeating;
