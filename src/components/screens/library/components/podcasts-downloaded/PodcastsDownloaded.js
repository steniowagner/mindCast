// @flow

import React from 'react';
import { FlatList, View, Text } from 'react-native';
import styled from 'styled-components';

import PodcastsDownloadedListItem from './PodcastsDownloadedListItem';
import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.dark};
`;

type Props = {
  navigation: Object,
};

const PodcastsDownloaded = ({ navigation }: Props): Object => {
  const { params } = navigation.state;
  const podcastsDownloaded = params[CONSTANTS.PARAMS.PODCASTS_DOWNLOADED];

  return (
    <Wrapper>
      <FlatList
        renderItem={({ item, index }) => (
          <PodcastsDownloadedListItem
            onPressItem={() => navigation.navigate(CONSTANTS.ROUTES.PLAYER, {
              [CONSTANTS.PARAMS.PLAYER]: {
                [CONSTANTS.KEYS.PLAYLIST]: [item],
              },
            })
            }
            podcast={item}
            index={index}
          />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => `${item.id}`}
        data={podcastsDownloaded}
      />
    </Wrapper>
  );
};

export default PodcastsDownloaded;
