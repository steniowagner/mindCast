// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import ScreenTitle from '~/components/common/ScreenTitle';
import Playlists from './components/playlists/Playlists';
import Sections from './components/sections/Sections';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.dark};
`;

type Props = {
  navigation: Object,
};

const Library = ({ navigation }: Props): Object => (
  <Wrapper>
    <ScreenTitle
      title="Library"
    />
    <Sections
      navigation={navigation}
    />
  </Wrapper>
);

export default Library;
