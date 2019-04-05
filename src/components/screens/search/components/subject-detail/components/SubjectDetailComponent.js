// @flow

import React, { Component, Fragment } from 'react';
import { Animated, StatusBar, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled, { withTheme } from 'styled-components';

import ProgressiveImage from '~/components/common/ProgressiveImage';
import CustomTab from '~/components/common/CustomTab';
import Loading from '~/components/common/Loading';
import TabContent from './TabContent';
import appStyles from '~/styles';

const TAB_ITEMS = [
  { id: 'featured', title: 'Featured' },
  { id: 'trending', title: 'Trending' },
  { id: 'authors', title: 'Authors' },
];

const HEADER_HEIGHT = appStyles.metrics.getHeightFromDP('20%');

const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secondaryColor};
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

const SmokeShadow = styled(LinearGradient).attrs(({ theme }) => ({
  colors: ['transparent', theme.colors.secondaryColor],
}))`
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  position: absolute;
`;

const ContentWrapper = styled(View)`
  width: 100%;
  height: 100%;
`;

type Props = {
  loading: boolean,
  subject: Object,
  error: boolean,
  theme: Object,
};

class SubjectDetail extends Component<Props, {}> {
  _outterListRef: Object = {};
  _tabsInitialPosition: Object = new Animated.ValueXY({
    x: 0,
    y: HEADER_HEIGHT * 2,
  });

  componentWillReceiveProps(nextProps: Props) {
    const { loading, error, subject } = nextProps;
    const shouldShowTabContent = !loading && !error && !!subject;

    if (shouldShowTabContent) {
      Animated.spring(this._tabsInitialPosition.y, {
        toValue: HEADER_HEIGHT,
        speed: 3.5,
        useNativeDriver: true,
      }).start();
    }
  }

  onChangeTabIndex = (indexSelected: number): void => {
    this._outterListRef.scrollToIndex({
      animated: true,
      index: indexSelected,
    });
  };

  getBarStyle = (theme: Object): string => (theme.colors.secondaryColor === '#111' ? 'light-content' : 'dark-content');

  renderHeader = (thumbnailImageURL: string, imageURL: string): Object => (
    <Header>
      <ProgressiveImage
        thumbnailImageURL={thumbnailImageURL}
        imageURL={imageURL}
      />
    </Header>
  );

  renderTabContent = (items: Object): Object => {
    const { trending, featured, authors } = items;

    return (
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
          trendingPodcasts={trending}
          featuredPodcasts={featured}
          authors={authors}
        />
      </ContentWrapper>
    );
  };

  renderContent = (): Object => {
    const { subject, theme } = this.props;
    const { data } = subject;
    const { thumbnailImageURL, imageURL, items } = data;

    const barStyle = this.getBarStyle(theme);

    return (
      <Fragment>
        <StatusBar
          backgroundColor="transparent"
          barStyle={barStyle}
          translucent
          animated
        />
        {this.renderHeader(thumbnailImageURL, imageURL)}
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
          {this.renderTabContent(items)}
        </Animated.View>
      </Fragment>
    );
  };

  render() {
    const {
      loading, error, subject, theme,
    } = this.props;

    return (
      <Container>{loading ? <Loading /> : this.renderContent()}</Container>
    );
  }
}

export default withTheme(SubjectDetail);
