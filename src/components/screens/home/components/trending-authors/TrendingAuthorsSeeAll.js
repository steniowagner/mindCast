// @flow

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import AuthorsListItem from '~/components/common/AuthorsListItem';
import CONSTANTS from '~/utils/CONSTANTS';
import PODCASTS from '../PODCASTS_TEST';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.dark};
`;

const TrendingAuthorsList = styled(FlatList)`
  width: 100%;
  height: 100%;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
`;

class TrendingAuthorsSeeAll extends Component {
  render() {
    const { navigation } = this.props;

    const AUTHORS = PODCASTS.map((podcast, index) => ({
      ...podcast.author,
      imageURL:
        'https://s3-sa-east-1.amazonaws.com/mind-cast/images/ragnar.jpeg',
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
              index={index + 1}
              withBottomline
              author={item}
              withIndex
              onPressItem={() => navigation.navigate(CONSTANTS.ROUTES.AUTHOR_DETAIL, {
                [CONSTANTS.PARAMS.AUTHOR_DETAIL]: {
                  id: item.id,
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
