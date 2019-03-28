// @flow

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import AuthorsListItem from '~/components/common/AuthorsListItem';
import CONSTANTS from '~/utils/CONSTANTS';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.dark};
`;

const TrendingAuthorsList = styled(FlatList)`
  width: 100%;
  height: 100%;
`;

class TrendingAuthorsSeeAll extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <Wrapper>
        <TrendingAuthorsList
          keyExtractor={podcast => `${podcast.id}`}
          showsVerticalScrollIndicator={false}
          data={[1, 2, 3, 4]}
          renderItem={({ item, index }) => (
            <AuthorsListItem
              podcastImage=""
              author={{
                name: 'Stenio Wagner',
                about: 'Computer Scientist',
                numberPodcasts: 12,
              }}
              onPress={() => navigation.navigate(CONSTANTS.ROUTES.AUTHOR_DETAIL, {
                [CONSTANTS.PARAMS.AUTHOR_DETAIL]: {
                  id: 'item.id',
                },
              })
              }
            />
          )}
        />
      </Wrapper>
    );
  }
}

export default TrendingAuthorsSeeAll;
