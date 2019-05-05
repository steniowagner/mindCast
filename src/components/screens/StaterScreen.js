// @flow

import React, { Component, Fragment } from 'react';

import SplashScreen from 'react-native-splash-screen';
import FastImage from 'react-native-fast-image';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlayerCreators } from '~/store/ducks/player';
import { Creators as LocalPodcastsManagerCreators } from '~/store/ducks/localPodcastsManager';
import { Creators as PlaylistsCreators } from '~/store/ducks/playlist';

import CONSTANTS from '~/utils/CONSTANTS';

type Props = {
  loadPodcastsRecentlyPlayed: Function,
  setPodcastsDownloadedList: Function,
  loadPlaylists: Function,
  navigation: Object,
};

class StaterScreen extends Component<Props, {}> {
  componentDidMount() {
    const {
      loadPodcastsRecentlyPlayed,
      setPodcastsDownloadedList,
      loadPlaylists,
      navigation,
    } = this.props;

    setPodcastsDownloadedList();

    loadPodcastsRecentlyPlayed();

    loadPlaylists();

    this.loadImages();

    SplashScreen.hide();

    navigation.navigate(CONSTANTS.ROUTES.ONBOARDING_INTRO);
  }

  loadImages = (): void => {
    FastImage.preload([
      {
        uri:
          'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/history/big.jpg',
      },
      {
        uri:
          'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/pop-culture/big.jpg',
      },
      {
        uri:
          'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/science/big.jpeg',
      },
      {
        uri:
          'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/philosofy/big.jpg',
      },
      {
        uri:
          'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/technology/big.jpg',
      },
      {
        uri:
          'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/all/all.jpg',
      },
      {
        uri:
          'https://s3-sa-east-1.amazonaws.com/mind-cast/images/background-image.jpg',
      },
      {
        uri:
          'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/user-profile/user-profile.jpg',
      },
    ]);
  };

  render() {
    return <Fragment />;
  }
}

const Creators = Object.assign(
  {},
  LocalPodcastsManagerCreators,
  PlaylistsCreators,
  PlayerCreators,
);

const mapDispatchToProps = dispatch => bindActionCreators(Creators, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(StaterScreen);
