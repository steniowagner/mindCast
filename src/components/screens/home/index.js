// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlayerCreators } from '~/store/ducks/player';
import { Creators as LocalPodcastsManagerCreators } from '~/store/ducks/localPodcastsManager';

import HomeComponent from './components';

type Props = {
  navigation: Object,
};

class HomeContainer extends Component<Props, {}> {
  componentDidMount() {
    const { setPodcastsDownloadedList, navigation } = this.props;

    setPodcastsDownloadedList();

    navigation.navigate('TEST');
  }

  render() {
    const { navigation } = this.props;

    return <HomeComponent
      navigation={navigation}
    />;
  }
}

const Creators = Object.assign(
  {},
  LocalPodcastsManagerCreators,
  PlayerCreators,
);

const mapDispatchToProps = dispatch => bindActionCreators(Creators, dispatch);

const mapStateToProps = state => ({
  localPodcastsManager: state.localPodcastsManager,
  player: state.player,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeContainer);
