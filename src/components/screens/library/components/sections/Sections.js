// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import { setHeaderPlayButtonPress } from '~/routes/utils/navigationOptions';
import CONSTANTS from '~/utils/CONSTANTS';
import SectionItem from './SectionItem';

const ContentWrapper = styled(View)`
  width: 100%;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  padding-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const getSectionsConfig = (
  LOCAL_STACK_ROUTES: Object,
  navigation: Object,
): Array<Object> => {
  const sections = [
    {
      onPress: () => navigation.navigate(LOCAL_STACK_ROUTES.PLAYLISTS, {
        LOCAL_STACK_ROUTES,
      }),
      iconName: 'playlist-play',
      title: 'Playlists',
    },
    {
      onPress: () => navigation.navigate(LOCAL_STACK_ROUTES.YOUR_PODCASTS, {
        [CONSTANTS.PARAMS.HEADER_PLAY_FUNCTION_PARAM]: (
          playlist,
          navigation,
        ) => setHeaderPlayButtonPress(playlist, navigation),
      }),
      iconName: 'podcast',
      title: 'Your Podcasts',
    },
    {
      onPress: () => navigation.navigate(LOCAL_STACK_ROUTES.PODCASTS_DOWNLOADED, {
        [CONSTANTS.PARAMS.HEADER_PLAY_FUNCTION_PARAM]: (
          playlist,
          navigation,
        ) => setHeaderPlayButtonPress(playlist, navigation),
      }),
      iconName: 'cloud-download-outline',
      title: 'Downloads',
    },
    {
      onPress: () => navigation.navigate(LOCAL_STACK_ROUTES.RECENTLY_PLAYED, {
        [CONSTANTS.PARAMS.HEADER_PLAY_FUNCTION_PARAM]: (
          playlist,
          navigation,
        ) => setHeaderPlayButtonPress(playlist, navigation),
      }),
      iconName: 'clock-outline',
      title: 'Recently Played',
    },
    {
      onPress: () => navigation.navigate(CONSTANTS.ROUTES.INTERESTS),
      iconName: 'playlist-check',
      title: 'Interests',
    },
  ];

  return sections;
};

type Props = {
  LOCAL_STACK_ROUTES: Object,
  navigation: Object,
};

const Sections = ({ LOCAL_STACK_ROUTES, navigation }: Props): Object => {
  const sections = getSectionsConfig(LOCAL_STACK_ROUTES, navigation);

  return (
    <ContentWrapper>
      {sections.map(option => (
        <SectionItem
          onPressItem={option.onPress}
          iconName={option.iconName}
          title={option.title}
          key={option.title}
        />
      ))}
    </ContentWrapper>
  );
};

export default Sections;
