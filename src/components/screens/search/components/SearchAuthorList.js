// @flow

import React, { Component } from 'react';
import { StatusBar, FlatList, View } from 'react-native';
import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as AuthorCreators } from '~/store/ducks/author';

import AuthorListItem from '~/components/common/AuthorsListItem';
import Loading from '~/components/common/Loading';
import CONSTANTS from '~/utils/CONSTANTS';

const Container = styled(View)`
  width: 100%;
  height: 100%;
  margin-top: 64px;
  background-color: ${({ theme }) => theme.colors.dark};
`;

type AuthorProps = {
  authors: Array<Object>,
  loading: boolean,
};

type Props = {
  searchAuthorByName: Function,
  author: AuthorProps,
  navigation: Object,
};

class SearchAuthorList extends Component<Props, {}> {
  componentDidMount() {
    const { searchAuthorByName, navigation } = this.props;
    const { params } = navigation.state;

    const authorName = params[CONSTANTS.SEARCH_AUTHOR_BY_NAME_PARAM];

    searchAuthorByName(authorName);

    console.tron.log('mount');
  }

  renderSearchAuthorsList = (authors: Array<Object>): Object => (
    <FlatList
      renderItem={({ item, index }) => (
        <AuthorListItem
          podcastImage={item.imageURL}
          isFirst={index === 0}
          author={item.author}
          title={item.title}
          stars={item.stars}
        />
      )}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => `${item.id}`}
      data={authors}
    />
  );

  render() {
    const { author } = this.props;
    const { loading, authors } = author;

    return (
      <Container>
        {loading ? <Loading /> : this.renderSearchAuthorsList(authors)}
      </Container>
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
)(SearchAuthorList);
