// @flow

import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { Creators as PlaylistsCreators } from '~/store/ducks/playlist';

import AllPodcastsListItem from './AllPodcastsListItem';
import CONSTANTS from '~/utils/CONSTANTS';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.dark};
`;

type Playlist = {
  isAvailableOffline: boolean,
  dowloads: Array<string>,
  podcasts: Array<Object>,
  title: string,
};

type Props = {
  podcastsDownloaded: Array<Object>,
  playlists: Array<Playlist>,
  navigation: Object,
};

const removePodcastsDuplicated = (podcasts: Array<Object>): Array<Object> => {
  const podcastsWithouDuplicated = podcasts.filter((podcast, index) => {
    const podcastIndex = podcasts.findIndex(
      podcastItem => podcastItem.id === podcast.id,
    );

    return podcastIndex === index;
  });

  return podcastsWithouDuplicated;
};

const getPodcastsFromPlaylists = (
  playlists: Array<Playlist>,
): Array<Object> => {
  const podcastsFromPlaylistsWithPossibleDuplicates = playlists
    .map(playlist => playlist.podcasts)
    .reduce((accumulator, podcasts) => accumulator.concat(podcasts), []);

  const podcastsFromPlaylists = removePodcastsDuplicated(
    podcastsFromPlaylistsWithPossibleDuplicates,
  );

  return podcastsFromPlaylists;
};

const getAllPodcasts = (
  podcastsDownloaded: Array<Object>,
  playlists: Array<Playlist>,
): Array<Object> => {
  const podcastsFromPlaylists = getPodcastsFromPlaylists(playlists);

  const allPodcasts = podcastsFromPlaylists.concat(
    podcastsDownloaded.filter(
      podcastDownloaded => podcastsFromPlaylists.findIndex(
        podcastFromPlaylists => podcastFromPlaylists.id === podcastDownloaded.id,
      ) < 0,
    ),
  );

  return allPodcasts;
};

const AllPodcasts = ({
  podcastsDownloaded,
  navigation,
  playlists,
}: Props): Object => {
  const allPodcasts = getAllPodcasts(podcastsDownloaded, playlists);

  return (
    <Wrapper>
      <FlatList
        renderItem={({ item, index }) => (
          <AllPodcastsListItem
            onPressDetailButton={() => navigation.navigate(CONSTANTS.ROUTES.PODCAST_DETAIL, {
              [CONSTANTS.KEYS
                .PODCAST_DETAIL_SHOULD_SHOW_AUTHOR_SECTION]: true,
              [CONSTANTS.PARAMS.PODCAST_DETAIL]: item,
            })
            }
            podcast={item}
          />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => `${item.id}`}
        data={allPodcasts}
      />
    </Wrapper>
  );
};

const mapStateToProps = state => ({
  podcastsDownloaded: state.localPodcastsManager.podcastsDownloaded,
  playlists: state.playlist.playlists,
});

export default connect(mapStateToProps)(AllPodcasts);
