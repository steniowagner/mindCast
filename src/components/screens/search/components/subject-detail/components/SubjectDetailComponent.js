// @flow

import React, { Component, Fragment } from 'react';
import { Animated, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled, { withTheme } from 'styled-components';

import ProgressiveImage from '~/components/common/ProgressiveImage';
import ErrorMessage from '~/components/common/ErrorMessage';
import CustomTab from '~/components/common/CustomTab';
import Loading from '~/components/common/Loading';
import CONSTANTS from '~/utils/CONSTANTS';
import TabContent from './TabContent';
import appStyles from '~/styles';

const TAB_ITEMS = [
  { id: 'featured', title: 'Featured' },
  { id: 'trending', title: 'Trending' },
  { id: 'authors', title: 'Authors' },
];

const HEADER_HEIGHT = appStyles.metrics.getHeightFromDP('25%');

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
  height: ${HEADER_HEIGHT};
  position: absolute;
`;

const ContentWrapper = styled(View)`
  width: 100%;
  height: 100%;
`;

type Props = {
  navigation: Object,
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
      Animated.timing(this._tabsInitialPosition.y, {
        toValue: HEADER_HEIGHT,
        duration: 250,
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

  renderHeader = (thumbnailImageURL: string, imageURL: string): Object => (
    <Header>
      <ProgressiveImage
        thumbnailImageURL={thumbnailImageURL}
        imageURL={imageURL}
      />
      <DarkLayer />
    </Header>
  );

  renderContent = (): Object => {
    const { navigation, subject, theme } = this.props;
    const { params } = navigation.state;

    const { imageURL, thumbnailImageURL } = params[
      CONSTANTS.PARAMS.SUBJECT_DETAIL
    ];
    const { data } = subject;

    return (
      <Fragment>
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
              trendingPodcasts={data.trending}
              featuredPodcasts={data.featured}
              authors={data.authors}
            />
          </ContentWrapper>
        </Animated.View>
      </Fragment>
    );
  };

  render() {
    const { loading, error, subject } = this.props;

    return (
      <Container>
        {!error && !loading && !!subject.data && this.renderContent()}
        {loading && !error && <Loading />}
        {error && !loading && (
          <ErrorMessage
            message="Seems like you're having some troubles when trying to connect with the server."
            icon="server-network-off"
            title="Oops..."
          />
        )}
      </Container>
    );
  }
}

export default withTheme(SubjectDetail);
