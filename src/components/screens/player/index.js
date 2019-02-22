// @flow

import React, { Component } from 'react';
import { View } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlayerCreators } from '~/store/ducks/player';

import BottomPlayerOptions from './components/bottom-player-options';
import BackgroundImage from './components/BackgroundImage';
import PodcastImage from './components/PodcastImage';

class Player extends Component<{}, {}> {
  componentDidMount() {
    const { setPodcast } = this.props;

    setPodcast();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <BackgroundImage
          imageURL="https://s3-sa-east-1.amazonaws.com/mind-cast/images/universe-thumbnail.jpeg"
        />
        <PodcastImage
          thumbnailImageURL="https://s3-sa-east-1.amazonaws.com/mind-cast/images/universe-thumbnail.jpeg"
          imageURL="https://s3-sa-east-1.amazonaws.com/mind-cast/images/universe.jpeg"
        />
        <BottomPlayerOptions />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(PlayerCreators, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(Player);
