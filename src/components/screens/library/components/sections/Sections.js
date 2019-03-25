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

const getSectionsConfig = (navigation: Object): Array<Object> => {
  const sections = [
    {
      onPress: () => navigation.navigate(ROUTE_NAMES.YOUR_PODCASTS),
      title: 'Your Podcasts',
      iconName: 'podcast',
    },
    {
      onPress: () => navigation.navigate(ROUTE_NAMES.PODCASTS_DOWNLOADED),
      title: 'Downloads',
      iconName: 'cloud-download-outline',
    },
    {
      onPress: () => {},
      title: 'Recently Played',
      iconName: 'clock-outline',
    },
    {
      onPress: () => navigation.navigate(CONSTANTS.ROUTES.INTERESTS),
      title: 'Interests',
      iconName: 'playlist-check',
    },
  ];

  return sections;
};

type Props = {
  navigation: Object,
};

const Sections = ({ navigation }: Props): Object => {
  const sections = getSectionsConfig(navigation);

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
