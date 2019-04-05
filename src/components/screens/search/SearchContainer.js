// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as AuthorCreators } from '~/store/ducks/author';
import { withTheme } from 'styled-components';

import SearchComponent from './components/SearchComponent';
import CONSTANTS from '~/utils/CONSTANTS';
import { ROUTE_NAMES } from './routes';

type AuthorProps = {
  loading: boolean,
};

type Props = {
  author: AuthorProps,
  navigation: Object,
  theme: Object,
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
    const { navigation, theme } = this.props;
    const { authorName } = this.state;

    if (authorName.length) {
      navigation.navigate(ROUTE_NAMES.SEARCH_AUTHORS_RESULT, {
        [CONSTANTS.PARAMS.SEARCH_AUTHOR_BY_NAME]: authorName,
        [CONSTANTS.PARAMS.APP_THEME]: theme,
      });
    }
  };

  onToggleDarkLayer = (isTextInputFocused: boolean) => {
    this.setState({
      isTextInputFocused,
    });
  };

  render() {
    const { navigation, author, theme } = this.props;
    const { isTextInputFocused } = this.state;
    const { loading } = author;

    return (
      <SearchComponent
        onSearchForAuthor={this.onSearchForAuthor}
        onToggleDarkLayer={this.onToggleDarkLayer}
        onTypeAuthorName={this.onTypeAuthorName}
        isTextInputFocused={isTextInputFocused}
        navigate={navigation.navigate}
        theme={theme}
        loading={loading}
      />
    );
  }
}

const mapStateToProps = state => ({
  author: state.author,
});

const mapDispatchToProps = dispatch => bindActionCreators(AuthorCreators, dispatch);

const SearchContainerWithTheme = withTheme(SearchContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchContainerWithTheme);
