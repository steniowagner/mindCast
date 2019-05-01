// @flow

import React from 'react';
import { ScrollView, RefreshControl, View } from 'react-native';
import styled, { withTheme } from 'styled-components';

import TrendingAuthorsDiscover from './trending-authors/trending-authors-discover/TrendingAuthorsDiscover';
import NewReleasesDiscover from './new-releases/new-releases-discover/NewReleasesDiscover';
import HottestPodcasts from './hottest-podcasts/HottestPodcastsDiscover';

import ErrorMessage from '~/components/common/ErrorMessage';
import ScreenTitle from '~/components/common/ScreenTitle';
import Loading from '~/components/common/Loading';
import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secondaryColor};
`;

type Data = {
  trendingAuthors: Array<Object>,
  hottestPodcasts: Array<Object>,
  newReleases: Array<Object>,
};

type Props = {
  navigation: Object,
  getHome: Function,
  loading: boolean,
  error: boolean,
  data: Data,
};

const HomeComponent = ({
  navigation,
  loading,
  error,
  data,
  getHome,
}: Props): Object => (
  <Wrapper>
    {loading && !error && <Loading />}
    {!loading && error && (
      <ErrorMessage
        message="Seems like you're having some troubles when trying to connect with the server."
        icon="server-network-off"
        title="Oops..."
      />
    )}
    {!loading && !error && (
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            progressBackgroundColor={appStyles.colors.primaryColor}
            tintColor={appStyles.colors.primaryColor}
            colors={[appStyles.colors.white]}
            refreshing={loading && !error}
            onRefresh={getHome}
          />
        }
      >
        <ScreenTitle
          title="Discover"
        />
        {data.newReleases && data.newReleases.length > 0 && (
          <NewReleasesDiscover
            data={data.newReleases}
            navigation={navigation}
          />
        )}
        {data.trendingAuthors && data.trendingAuthors.length > 0 && (
          <TrendingAuthorsDiscover
            data={data.trendingAuthors}
            navigation={navigation}
          />
        )}
        {data.hottestPodcasts && data.hottestPodcasts.length > 0 && (
          <HottestPodcasts
            data={data.hottestPodcasts}
            navigation={navigation}
          />
        )}
      </ScrollView>
    )}
  </Wrapper>
);

export default HomeComponent;
