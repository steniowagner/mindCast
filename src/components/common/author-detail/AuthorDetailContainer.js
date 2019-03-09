// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as AuthorCreators } from '~/store/ducks/author';

import AuthorDetailComponent from './components/AuthorDetailComponent';
import CONSTANTS from '~/utils/CONSTANTS';

type AuthorProps = {
  loading: boolean,
  error: boolean,
  data: Object,
};

type Props = {
  getAuthorById: Function,
  author: AuthorProps,
  navigation: Object,
};

class AuthorDetailContainer extends Component<Props, {}> {
  componentDidMount() {
    const { getAuthorById, navigation } = this.props;
    const { params } = navigation.state;
    const { id } = params[CONSTANTS.AUTHOR_DETAIL_PARAMS];

    getAuthorById(id);
  }

  render() {
    const { navigation, author } = this.props;
    const { loading, data, error } = author;

    return (
      <AuthorDetailComponent
        navigation={navigation}
        loading={loading}
        error={error}
        author={data}
      />
    );
  }
}

const mapStateToProps = state => ({
  author: state.author,
});

const mapDispatchToProps = dispatch => bindActionCreators(AuthorCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthorDetailContainer);
