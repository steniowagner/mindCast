// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import { ROUTE_NAMES } from '../../routes';
import CONSTANTS from '~/utils/CONSTANTS';
import SectionItem from './SectionItem';

const ContentWrapper = styled(View)`
  width: 100%;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  padding-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const setHeaderPlayButtonPress = (
  playlist: Array<Object>,
  navigation: Object,
): void => {
  const onPressPlayHeaderButton = () => {
    if (playlist.length > 0) {
      navigation.navigate(CONSTANTS.ROUTES.PLAYER, {
        [CONSTANTS.PARAMS.PLAYER]: {
          [CONSTANTS.KEYS.PLAYLIST]: playlist,
        },
      });
    }
  };

  navigation.setParams({
    [CONSTANTS.PARAMS.HEADER_PLAY_ACTION]: onPressPlayHeaderButton,
  });
};

const getSectionsConfig = (navigate: Function): Array<Object> => {
  const sections = [
    {
      onPress: () => navigate(ROUTE_NAMES.YOUR_PODCASTS, {
        [CONSTANTS.PARAMS.HEADER_PLAY_FUNCTION_PARAM]: (
          playlist,
          navigation,
        ) => setHeaderPlayButtonPress(playlist, navigation),
      }),
      iconName: 'podcast',
      title: 'Your Podcasts',
    },
    {
      onPress: () => navigate(ROUTE_NAMES.PODCASTS_DOWNLOADED, {
        [CONSTANTS.PARAMS.HEADER_PLAY_FUNCTION_PARAM]: (
          playlist,
          navigation,
        ) => setHeaderPlayButtonPress(playlist, navigation),
      }),
      iconName: 'cloud-download-outline',
      title: 'Downloads',
    },
    {
      onPress: () => navigate(ROUTE_NAMES.RECENTLY_PLAYED, {
        [CONSTANTS.PARAMS.HEADER_PLAY_FUNCTION_PARAM]: (
          playlist,
          navigation,
        ) => setHeaderPlayButtonPress(playlist, navigation),
      }),
      iconName: 'clock-outline',
      title: 'Recently Played',
    },
    {
      onPress: () => navigate(CONSTANTS.ROUTES.INTERESTS),
      iconName: 'playlist-check',
      title: 'Interests',
    },
  ];

  return sections;
};

type Props = {
  navigation: Object,
};

const Sections = ({ navigation }: Props): Object => {
  const sections = getSectionsConfig(navigation.navigate);

  return (
    <ContentWrapper>
      {sections.map(option => (
        <SectionItem
          setHeaderPlayButtonPress={setHeaderPlayButtonPress}
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
