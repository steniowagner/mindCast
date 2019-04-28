// @flow

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import AuthorsListItem from '~/components/common/AuthorListItemWithSubjects';
import CONSTANTS from '~/utils/CONSTANTS';

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

type Props = {
  navigation: Object,
};

const TrendingAuthorsSeeAll = ({ navigation }: Props): Object => {
  const { params } = navigation.state;
  const trendingAuthors = params[CONSTANTS.PARAMS.TRENDING_AUTHORS];

  return (
    <Wrapper>
      <TrendingAuthorsList
        keyExtractor={author => `${author.id}`}
        showsVerticalScrollIndicator={false}
        data={trendingAuthors}
        renderItem={({ item, index }) => (
          <AuthorsListItem
            onPress={() => navigation.navigate(CONSTANTS.ROUTES.AUTHOR_DETAIL, {
              [CONSTANTS.PARAMS.AUTHOR_DETAIL]: {
                id: item.id,
              },
            })
            }
            numberPodcasts={item.podcasts.length}
            profileImage={item.profileImageURL}
            subjects={item.categories}
            name={item.name}
            id={item.id}
          />
        )}
      />
    </Wrapper>
  );
};

export default TrendingAuthorsSeeAll;
