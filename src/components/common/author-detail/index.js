// @flow

import React, { Component } from 'react';
import { Animated, View } from 'react-native';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';

import ProgressiveImage from '~/components/common/ProgressiveImage';
import NewReleasesSection from './components/new-releases-section';
import SubjectsSection from './components/SubjectsSection';
import RelatedAuthors from './components/related-authors';
import SectionWrapper from './components/SectionWrapper';
import AboutSection from './components/AboutSection';
import AuthorName from './components/AuthorName';
import Featured from './components/featured';

import appStyles from '~/styles';

const Container = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.dark};
`;

const Header = styled(Animated.View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('30%')};
  position: absolute;
  justify-content: flex-end;
`;

const ImageWrapper = styled(View)`
  width: 100%;
  height: 100%;
`;

const SmokeShadow = styled(LinearGradient).attrs({
  colors: ['transparent', appStyles.colors.dark],
})`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('30%')};
  position: absolute;
`;

class AuthorDetail extends Component {
  _scrollViewOffset = new Animated.Value(0);
  _scrollViewInitialPosition = new Animated.ValueXY({
    x: 0,
    y: appStyles.metrics.getHeightFromDP('40%'),
  });

  componentDidMount() {
    Animated.spring(this._scrollViewInitialPosition.y, {
      toValue: 0,
      speed: 3.5,
      useNativeDriver: true,
    }).start();
  }

  renderAuthorImage = (): Object => (
    <Header
      style={{
        opacity: this._scrollViewOffset.interpolate({
          inputRange: [0, appStyles.metrics.getHeightFromDP('25%')],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        }),
      }}
    >
      <ImageWrapper>
        <ProgressiveImage
          thumbnailImageURL="https://s2.glbimg.com/3auOxS3cG2mc_H5jFXDpxC7ol-w=/e.glbimg.com/og/ed/f/original/2016/09/12/dr-alan-turing-2956483.jpg"
          imageURL="https://s2.glbimg.com/3auOxS3cG2mc_H5jFXDpxC7ol-w=/e.glbimg.com/og/ed/f/original/2016/09/12/dr-alan-turing-2956483.jpg"
        />
      </ImageWrapper>
    </Header>
  );

  render() {
    return (
      <Container>
        {this.renderAuthorImage()}
        <SmokeShadow />
        <Animated.ScrollView
          scrollEventThrottle={16}
          style={[
            {
              paddingTop: appStyles.metrics.getHeightFromDP('6%'),
              transform: [
                {
                  translateY: this._scrollViewInitialPosition.y,
                },
              ],
            },
          ]}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: { y: this._scrollViewOffset },
              },
            },
          ])}
          showsVerticalScrollIndicator={false}
        >
          <AuthorName
            name="Alan Turing"
          />
          <SectionWrapper>
            <AboutSection
              about="English mathematician, computer scientist, logician, cryptanalyst, philosopher and theorical biologist."
            />
          </SectionWrapper>
          <SectionWrapper>
            <SubjectsSection
              subjects={['math', 'science', 'philosofy', 'technology']}
            />
          </SectionWrapper>
          <NewReleasesSection />
          <SectionWrapper>
            <Featured />
          </SectionWrapper>
          <SectionWrapper>
            <RelatedAuthors />
          </SectionWrapper>
        </Animated.ScrollView>
      </Container>
    );
  }
}

export default AuthorDetail;
