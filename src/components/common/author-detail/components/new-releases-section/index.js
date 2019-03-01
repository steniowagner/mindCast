// @flow

import React, { Fragment } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import SectionTitle from '../SectionTitle';

import NewReleasesSectionItemList from './NewReleasesSectionItemList';

const NewReleasesSection = (): Object => (
  <Fragment>
    <SectionTitle
      title="New Releases"
    />
    <NewReleasesSectionItemList />
  </Fragment>
);

export default NewReleasesSection;
