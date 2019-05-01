// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as AuthorCreators } from '~/store/ducks/author';

import SearchComponent from './components/SearchComponent';
import CONSTANTS from '~/utils/CONSTANTS';

type Props = {
  LOCAL_STACK_ROUTES: Object,
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
    const { navigation, LOCAL_STACK_ROUTES } = this.props;
    const { authorName } = this.state;

    if (authorName.length) {
      navigation.navigate(LOCAL_STACK_ROUTES.SEARCH_AUTHORS_RESULT, {
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
    const { navigation } = this.props;
    const { isTextInputFocused } = this.state;

    return (
      <SearchComponent
        onSearchForAuthor={this.onSearchForAuthor}
        onToggleDarkLayer={this.onToggleDarkLayer}
        onTypeAuthorName={this.onTypeAuthorName}
        isTextInputFocused={isTextInputFocused}
        navigation={navigation}
      />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(AuthorCreators, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(SearchContainer);
