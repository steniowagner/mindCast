// @flow

import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components';

import AuthorName from './components/AuthorName';
import AboutSection from './components/AboutSection';
import SubjectsSection from './components/SubjectsSection';
import SectionWrapper from './components/SectionWrapper';
import NewReleasesSection from './components/new-releases-section';
import Featured from './components/featured';
import RelatedAuthors from './components/related-authors';
import ProgressiveImage from '~/components/common/ProgressiveImage';

const Container = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.dark};
`;

const ImageWrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('25%')};
  position: absolute;
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: 100%
  position: absolute;
  background-color: ${({ theme }) => theme.colors.darkLayer};
`;

class AuthorDetail extends Component {
  componentDidMount() {}

  render() {
    return (
      <Container>
        <ImageWrapper>
          <ProgressiveImage
            thumbnailImageURL="https://s2.glbimg.com/3auOxS3cG2mc_H5jFXDpxC7ol-w=/e.glbimg.com/og/ed/f/original/2016/09/12/dr-alan-turing-2956483.jpg"
            imageURL="https://s2.glbimg.com/3auOxS3cG2mc_H5jFXDpxC7ol-w=/e.glbimg.com/og/ed/f/original/2016/09/12/dr-alan-turing-2956483.jpg"
          />
          <DarkLayer />
        </ImageWrapper>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            // padding-left: ${({ theme }) => theme.metrics.extraLargeSize}px;
            paddingLeft: 12,
          }}
          onMomentumScrollBegin={() => console.tron.log('onMomentumScrollBegin')
          }
        >
          <AuthorName
            name="Alan Turing"
          />
          <SectionWrapper>
            <AboutSection />
          </SectionWrapper>
          <SectionWrapper>
            <SubjectsSection />
          </SectionWrapper>
          <SectionWrapper>
            <NewReleasesSection />
          </SectionWrapper>
          <SectionWrapper>
            <Featured />
          </SectionWrapper>
          <SectionWrapper>
            <RelatedAuthors />
          </SectionWrapper>
        </ScrollView>
      </Container>
    );
  }
}

export default AuthorDetail;
