// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as HomeCreators } from '~/store/ducks/home';

import HomeComponent from './components/HomeComponent';
import CONSTANTS from '~/utils/CONSTANTS';

type HomeStoreData = {
  loading: boolean,
  error: boolean,
  data: Object,
};

type Props = {
  LOCAL_STACK_ROUTES: Object,
  home: HomeStoreData,
  navigation: Object,
  getHome: Function,
};

class HomeContainer extends Component<Props, {}> {
  componentDidMount() {
    const { LOCAL_STACK_ROUTES, getHome, navigation } = this.props;

    getHome();

    navigation.setParams({
      LOCAL_STACK_ROUTES,
    });
  }

  render() {
    const { navigation, getHome, home } = this.props;
    const { loading, error, data } = home;

    return (
      <HomeComponent
        navigation={navigation}
        getHome={getHome}
        loading={loading}
        error={error}
        data={data}
      />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(HomeCreators, dispatch);

const mapStateToProps = state => ({
  home: state.home,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeContainer);
