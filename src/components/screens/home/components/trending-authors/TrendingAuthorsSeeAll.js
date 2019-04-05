// @flow

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import AuthorsListItem from '~/components/common/AuthorListItemWithSubjects';
import CONSTANTS from '~/utils/CONSTANTS';
import PODCASTS from '../PODCASTS_TEST';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

const TrendingAuthorsList = styled(FlatList)`
  width: 100%;
  height: 100%;
`;

class TrendingAuthorsSeeAll extends Component {
  render() {
    const { navigation } = this.props;

    const AUTHORS = PODCASTS.map((podcast, index) => ({
      ...podcast.author,
      imageURL:
        'https://s3-sa-east-1.amazonaws.com/mind-cast/images/ragnar.jpeg',
      subjects: ['science', 'technology', 'history', 'philosofy'],
      id: index,
    }));

    return (
      <Wrapper>
        <TrendingAuthorsList
          keyExtractor={podcast => `${podcast.id}`}
          showsVerticalScrollIndicator={false}
          data={AUTHORS}
          renderItem={({ item, index }) => (
            <AuthorsListItem
              onPress={() => navigation.navigate(CONSTANTS.ROUTES.AUTHOR_DETAIL, {
                [CONSTANTS.PARAMS.AUTHOR_DETAIL]: {
                  id: item.id,
                },
              })
              }
              numberPodcasts={item.numberPodcasts}
              profileImage={item.imageURL}
              subjects={item.subjects}
              name={item.name}
              id={item.id}
            />
          )}
        />
      </Wrapper>
    );
  }
}

export default TrendingAuthorsSeeAll;
