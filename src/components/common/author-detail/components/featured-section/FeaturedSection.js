// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import SectionWithButton from '~/components/common/SectionWithButton';
import FeaturedListItem from './FeaturedListItem';
import CONSTANTS from '~/utils/CONSTANTS';

const Wrapper = styled(View)`
  width: 100%;
  margin-vertical: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const ItemsWrapper = styled(View)`
  margin-left: ${({ theme }) => theme.metrics.extraLargeSize}px;
  margin-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

type Props = {
  featured: Array<Object>,
  onPressItem: Function,
  navigation: Object,
};

const Featured = ({ onPressItem, navigation, featured }: Props): Object => (
  <Wrapper>
    <SectionWithButton
      onPress={() => navigation.navigate(CONSTANTS.ROUTES.PLAYER, {
        [CONSTANTS.PARAMS.PLAYER]: {
          [CONSTANTS.KEYS.PLAYLIST]: featured,
        },
      })
      }
      buttonSize="small"
      buttonText="LISTEN NOW"
      sectionTitle="Featured"
    />
    <ItemsWrapper>
      {featured.map((podcast, index) => (
        <FeaturedListItem
          onPress={() => onPressItem(podcast)}
          imageURL={podcast.imageURL}
          fileName={podcast.fileName}
          subject={podcast.category}
          title={podcast.title}
          index={index + 1}
          key={podcast.id}
        />
      ))}
    </ItemsWrapper>
  </Wrapper>
);

export default Featured;
