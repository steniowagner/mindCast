// @flow

import React from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components';

import TrendingAuthorsDiscover from './trending-authors/trending-authors-discover/TrendingAuthorsDiscover';
import HottestPodcasts from './hottest-podcasts/HottestPodcastsDiscover';

import ScreenTitle from '~/components/common/ScreenTitle';
import CONSTANTS from '~/utils/CONSTANTS';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.dark};
`;

type Props = {
  navigation: Object,
};

const HomeComponent = ({ navigation }: Props): Object => (
  <Wrapper>
    <ScrollView>
      <ScreenTitle
        title="Discover"
      />
      <HottestPodcasts
        navigation={navigation}
      />
      <TrendingAuthorsDiscover
        navigation={navigation}
      />
    </ScrollView>
  </Wrapper>
);

export default HomeComponent;
