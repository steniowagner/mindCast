// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as AuthorCreators } from '~/store/ducks/author';

import SearchComponent from './components/SearchComponent';
import CONSTANTS from '~/utils/CONSTANTS';

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
    const { navigation } = this.props;
    const { authorName } = this.state;

    if (authorName.length) {
      const { params } = navigation.state;

      navigation.navigate(params.LOCAL_STACK_ROUTES.SEARCH_AUTHORS_RESULT, {
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
    const { navigation, author } = this.props;
    const { isTextInputFocused } = this.state;
    const { loading } = author;

    return (
      <SearchComponent
        onSearchForAuthor={this.onSearchForAuthor}
        onToggleDarkLayer={this.onToggleDarkLayer}
        onTypeAuthorName={this.onTypeAuthorName}
        isTextInputFocused={isTextInputFocused}
        navigation={navigation}
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
