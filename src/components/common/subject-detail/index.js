// @flow

import React from 'react';
import { ScrollView, View } from 'react-native';

import FeaturedListItem from './components/FeaturedListItem';
import TrendingListItem from './components/TrendingListItem';
import AuthorsListItem from './components/AuthorsListItem';

const SubjectDetail = (): Object => (
  <ScrollView
    style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
    }}
  >
    <View
      style={{
        marginBottom: 24,
        marginTop: 48,
      }}
    >
      <FeaturedListItem />
    </View>

    <View
      style={{
        marginBottom: 24,
        paddingHorizontal: 6,
      }}
    >
      <TrendingListItem />
    </View>

    <View
      style={{
        marginBottom: 24,
        paddingHorizontal: 6,
      }}
    >
      <AuthorsListItem />
    </View>
  </ScrollView>
);

export default SubjectDetail;
