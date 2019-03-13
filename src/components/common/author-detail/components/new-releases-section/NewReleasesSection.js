// @flow

import React from 'react';
import { FlatList, View } from 'react-native';
import { StackActions } from 'react-navigation';
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
  margin-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const ListFooterComponent = styled(View)`
  width: ${({ theme }) => theme.metrics.extraLargeSize * 1.2}px;
  height: 1px;
`;

type Props = {
  newReleases: Array<Object>,
  onPressItem: Function,
  navigation: Object,
};

const NewReleasesSection = ({
  onPressItem,
  newReleases,
  navigation,
}: Props): Object => (
  <Wrapper>
    <SectionWithButton
      sectionTitle="New Releases"
      onPress={() => navigation.navigate(CONSTANTS.ROUTES.PLAYER, {
        [CONSTANTS.PARAMS.PLAYER]: {
          [CONSTANTS.KEYS.PLAYLIST]: newReleases,
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
          onPress={() => onPressItem(item)}
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
