// @flow

import React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import NewReleasesSectionItemList from './NewReleasesSectionItemList';
import SectionWithButton from '../SectionWithButton';
import CONSTANTS from '~/utils/CONSTANTS';

const Wrapper = styled(View)`
  width: 100%;
  margin-vertical: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const NewReleasesList = styled(FlatList)`
  width: 100%;
  padding-left: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const ListFooterComponent = styled(View)`
  width: ${({ theme }) => theme.metrics.extraLargeSize * 1.2}px;
  height: 1px;
`;

type Props = {
  newReleases: Array<Object>,
  navigation: Object,
};

const NewReleasesSection = ({ newReleases, navigation }: Props): Object => (
  <Wrapper>
    <SectionWithButton
      sectionTitle="New Releases"
      onPress={() => navigation.navigate(CONSTANTS.NAVIGATE_PLAYER, {
        [CONSTANTS.PLAYER_PARAMS]: {
          [CONSTANTS.PLAYLIST_KEY]: newReleases,
        },
      })
      }
    />
    <NewReleasesList
      ListFooterComponent={ListFooterComponent}
      showsHorizontalScrollIndicator={false}
      horizontal
      keyExtractor={podcast => `${podcast.id}`}
      data={newReleases}
      renderItem={({ item }) => (
        <NewReleasesSectionItemList
          onPress={() => navigation.navigate(CONSTANTS.NAVIGATE_PLAYER, {
            [CONSTANTS.PLAYER_PARAMS]: {
              [CONSTANTS.PLAYLIST_KEY]: [item],
            },
          })
          }
          imageURL={item.imageURL}
          subject={item.subject}
          title={item.title}
          stars={item.stars}
        />
      )}
    />
  </Wrapper>
);

export default NewReleasesSection;
