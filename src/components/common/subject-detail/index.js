// @flow

import React, { Component } from 'react';
import { Animated, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';

import ProgressiveImage from '~/components/common/ProgressiveImage';
import CustomTab from '~/components/common/CustomTab';
import TabContent from './components/TabContent';
import appStyles from '~/styles';

const TAB_ITEMS = [
  { id: 'trending', title: 'Trending' },
  { id: 'featured', title: 'Featured' },
  { id: 'authors', title: 'Authors' },
];

const HEADER_HEIGHT = appStyles.metrics.getHeightFromDP('20%');

const PODCASTS = Array(7).fill({
  id: Math.random(),
  imageURL:
    'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/reviewers/alex-holyoake.jpg',
  title: 'How solve puzzles can make you a better cryptographer',
  author: {
    thumbnailImageURL:
      'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/reviewers/alex-holyoake.jpg',
    name: 'Ada Lovelace',
    about:
      'English mathematician, computer scientist, logician, cryptanalyst, philosopher and theoretical biologist.',
    numberPodcasts: 7,
  },
  stars: 4.5,
});

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.dark};
`;

const Header = styled(View)`
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  position: absolute;
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.lighDarkLayer};
  position: absolute;
`;

const SmokeShadow = styled(LinearGradient).attrs({
  colors: ['transparent', appStyles.colors.dark],
})`
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  position: absolute;
`;

const ContentWrapper = styled(View)`
  width: 100%;
  height: 100%;
`;

class SubjectDetail extends Component<{}, {}> {
  _outterListRef: Object = {};
  _tabsInitialPosition: Object = new Animated.ValueXY({
    x: 0,
    y: HEADER_HEIGHT * 2,
  });

  componentDidMount() {
    Animated.spring(this._tabsInitialPosition.y, {
      toValue: HEADER_HEIGHT,
      speed: 3.5,
      useNativeDriver: true,
    }).start();
  }

  onChangeTabIndex = (indexSelected: number): void => {
    this._outterListRef.scrollToIndex({
      animated: true,
      index: indexSelected,
    });
  };

  render() {
    return (
      <Container>
        <Header>
          <ProgressiveImage
            thumbnailImageURL="https://s2.glbimg.com/3auOxS3cG2mc_H5jFXDpxC7ol-w=/e.glbimg.com/og/ed/f/original/2016/09/12/dr-alan-turing-2956483.jpg"
            imageURL="https://s2.glbimg.com/3auOxS3cG2mc_H5jFXDpxC7ol-w=/e.glbimg.com/og/ed/f/original/2016/09/12/dr-alan-turing-2956483.jpg"
          />
          <DarkLayer />
        </Header>
        <SmokeShadow />
        <Animated.View
          style={[
            {
              marginBottom: HEADER_HEIGHT,
              transform: [
                {
                  translateY: this._tabsInitialPosition.y,
                },
              ],
            },
          ]}
        >
          <ContentWrapper>
            <CustomTab
              onChangeTabIndex={this.onChangeTabIndex}
              contentWidth={appStyles.metrics.width}
              data={TAB_ITEMS}
              theme="dark"
            />
            <TabContent
              setListRef={(ref) => {
                this._outterListRef = ref;
              }}
              trendingPodcasts={PODCASTS}
              featuredPodcasts={PODCASTS}
              authors={PODCASTS}
            />
          </ContentWrapper>
        </Animated.View>
      </Container>
    );
  }
}

export default SubjectDetail;
