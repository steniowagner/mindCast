// @flow

import React, { Animated, Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as AuthorCreators } from '~/store/ducks/author';

import SearchAuthorListComponent from './components';
import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

type AuthorProps = {
  authors: Array<Object>,
  loading: boolean,
};

type Props = {
  searchAuthorByName: Function,
  author: AuthorProps,
  navigation: Object,
};

class SearchAuthorListContainer extends Component<Props, {}> {
  componentDidMount() {
    const { searchAuthorByName } = this.props;

    const authorName = this.getAuthorNameParam();

    searchAuthorByName(authorName);
  }

  getAuthorNameParam = (): string => {
    const { navigation } = this.props;
    const { params } = navigation.state;

    const authorName = params[CONSTANTS.SEARCH_AUTHOR_BY_NAME_PARAM];

    return authorName;
  };

  render() {
    const { navigation, author } = this.props;
    const { loading, authors } = author;
    const authorName = this.getAuthorNameParam();

    return (
      <SearchAuthorListComponent
        authorName={authorName}
        navigation={navigation}
        loading={loading}
        authors={authors}
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
)(SearchAuthorListContainer);
