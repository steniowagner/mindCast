// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as AuthorCreators } from '~/store/ducks/author';

import SearchComponent from './components/SearchComponent';
import CONSTANTS from '~/utils/CONSTANTS';
import { ROUTE_NAMES } from './routes';

type AuthorProps = {
  loading: boolean,
};

type Props = {
  author: AuthorProps,
  navigation: Object,
};

type State = {
  isTextInputFocused: boolean,
  authorName: string,
};

class SearchContainer extends Component<Props, State> {
  state = {
    isTextInputFocused: false,
    authorName: '',
  };

  onTypeAuthorName = (authorName: string): void => {
    this.setState({
      authorName,
    });
  };

  onSearchForAuthor = (): void => {
    const { authorName } = this.state;
    const { navigation } = this.props;

    if (authorName.length) {
      navigation.navigate(ROUTE_NAMES.SEARCH_AUTHORS_RESULT, {
        [CONSTANTS.PARAMS.SEARCH_AUTHOR_BY_NAME]: authorName,
      });
    }
  };

  onToggleDarkLayer = (isTextInputFocused: boolean) => {
    this.setState({
      isTextInputFocused,
    });
  };

  render() {
    const { isTextInputFocused } = this.state;
    const { navigation, author } = this.props;
    const { loading } = author;

    return (
      <SearchComponent
        onSearchForAuthor={this.onSearchForAuthor}
        onToggleDarkLayer={this.onToggleDarkLayer}
        onTypeAuthorName={this.onTypeAuthorName}
        isTextInputFocused={isTextInputFocused}
        navigate={navigation.navigate}
        loading={loading}
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
)(SearchContainer);
