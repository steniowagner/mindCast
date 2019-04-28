// @flow

import React from 'react';
import { FlatList, View } from 'react-native';
import { StackActions } from 'react-navigation';
import styled from 'styled-components';

import NewReleasesSectionItemList from './NewReleasesSectionItemList';
import SectionWithButton from '~/components/common/SectionWithButton';
import CONSTANTS from '~/utils/CONSTANTS';

const Wrapper = styled(View)`
  width: 100%;
  margin-vertical: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const NewReleasesList = styled(FlatList)`
  width: 100%;
  margin-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
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
      onPress={() => navigation.navigate(CONSTANTS.ROUTES.PLAYER, {
        [CONSTANTS.PARAMS.PLAYER]: {
          [CONSTANTS.KEYS.PLAYLIST]: newReleases,
        },
      })
      }
      sectionTitle="New Releases"
      buttonText="LISTEN NOW"
      buttonSize="small"
    />
    <NewReleasesList
      showsHorizontalScrollIndicator={false}
      keyExtractor={podcast => `${podcast.id}`}
      data={newReleases}
      horizontal
      renderItem={({ item, index }) => (
        <NewReleasesSectionItemList
          isLastIndex={index === newReleases.length - 1}
          onPress={() => onPressItem(item)}
          imageURL={item.imageURL}
          subject={item.category}
          title={item.title}
          stars={item.stars}
        />
      )}
    />
  </Wrapper>
);

export default NewReleasesSection;
