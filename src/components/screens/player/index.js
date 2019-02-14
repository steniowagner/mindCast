// @flow

import React, { Component } from 'react';
import { View } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlayerCreators } from '~/store/ducks/player';

import PlayerControls from './components/PlayerControls';

class Player extends Component<{}, {}> {
  componentDidMount() {
    const { setPodcast } = this.props;
    setPodcast();
  }

  render() {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <PlayerControls />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(PlayerCreators, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(Player);
