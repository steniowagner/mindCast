// @flow

import React from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components';

import TrendingAuthorsDiscover from './trending-authors/trending-authors-discover/TrendingAuthorsDiscover';
import NewReleasesDiscover from './new-releases/new-releases-discover/NewReleasesDiscover';
import HottestPodcasts from './hottest-podcasts/HottestPodcastsDiscover';

import ScreenTitle from '~/components/common/ScreenTitle';
import CONSTANTS from '~/utils/CONSTANTS';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secondaryColor};
`;

type Props = {
  navigation: Object,
};

const HomeComponent = ({ navigation }: Props): Object => (
  <Wrapper>
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <ScreenTitle
        title="Discover"
      />
      <NewReleasesDiscover
        navigation={navigation}
      />
      <TrendingAuthorsDiscover
        navigation={navigation}
      />
      <HottestPodcasts
        navigation={navigation}
      />
    </ScrollView>
  </Wrapper>
);

export default HomeComponent;
