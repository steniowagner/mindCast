// @flow

import React, { PureComponent, Fragment } from 'react';
import { StatusBar, Animated, View } from 'react-native';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';
import { StackActions } from 'react-navigation';

import ProgressiveImage from '~/components/common/ProgressiveImage';
import Loading from '~/components/common/Loading';
import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

import FeaturedSection from './featured-section/FeaturedSection';
import NewReleasesSection from './new-releases-section/NewReleasesSection';
import SubjectsSection from './SubjectsSection';
import RelatedAuthors from './related-authors/RelatedAuthors';
import SectionWrapper from './SectionWrapper';
import AboutSection from './AboutSection';
import AuthorName from './AuthorName';

const Container = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.secondaryColor};
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

const SmokeShadow = styled(LinearGradient).attrs(({ theme }) => ({
  colors: ['transparent', theme.colors.secondaryColor],
}))`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('30%')};
  position: absolute;
`;

type AuthorProps = {
  profileImageThumbnail: string,
  relatedAuthors: Array<Object>,
  newReleases: Array<Object>,
  featured: Array<Object>,
  subjects: Array<string>,
  profileImage: string,
  about: string,
  name: string,
  id: string,
};

type Props = {
  author: AuthorProps,
  navigation: Object,
  loading: boolean,
  error: boolean,
};

class AuthorDetailComponent extends PureComponent<Props, {}> {
  _scrollViewOffset = new Animated.Value(0);
  _scrollViewInitialPosition = new Animated.ValueXY({
    x: 0,
    y: appStyles.metrics.getHeightFromDP('40%'),
  });

  componentWillReceiveProps(nextProps: Props) {
    const { loading, error, author } = nextProps;
    const shouldShowContent = !loading && !error && !!author;

    if (shouldShowContent) {
      this._scrollViewOffset.setValue(0);

      Animated.spring(this._scrollViewInitialPosition.y, {
        toValue: 0,
        speed: 3.5,
        useNativeDriver: true,
      }).start();
    }
  }

  onPressPodcastListItem = (podcast: Object, navigation: Object): void => {
    const theme = this.getAppTheme();

    const pushAction = StackActions.push({
      routeName: CONSTANTS.ROUTES.PODCAST_DETAIL,
      params: {
        [CONSTANTS.KEYS.PODCAST_DETAIL_SHOULD_SHOW_AUTHOR_SECTION]: false,
        [CONSTANTS.PARAMS.PODCAST_DETAIL]: podcast,
        [CONSTANTS.PARAMS.APP_THEME]: theme,
      },
    });

    navigation.dispatch(pushAction);
  };

  renderAuthorImage = (
    profileImageThumbnail: string,
    profileImage: string,
  ): Object => (
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
          thumbnailImageURL={profileImageThumbnail}
          imageURL={profileImage}
        />
      </ImageWrapper>
    </Header>
  );

  renderContent = (): Object => {
    const { navigation, author } = this.props;

    const {
      profileImageThumbnail,
      relatedAuthors,
      profileImage,
      newReleases,
      featured,
      subjects,
      about,
      name,
    } = author;

    return (
      <Fragment>
        {this.renderAuthorImage(profileImageThumbnail, profileImage)}
        <SmokeShadow />
        <Animated.ScrollView
          scrollEventThrottle={16}
          style={[
            {
              paddingBottom: appStyles.metrics.getHeightFromDP('6%'),
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
          <SectionWrapper>
            <AuthorName
              name={name}
            />
          </SectionWrapper>
          <SectionWrapper>
            <AboutSection
              about={about}
            />
          </SectionWrapper>
          <SectionWrapper>
            <SubjectsSection
              subjects={subjects}
            />
          </SectionWrapper>
          <NewReleasesSection
            onPressItem={podcast => this.onPressPodcastListItem(podcast, navigation)
            }
            newReleases={newReleases}
            navigation={navigation}
          />
          <FeaturedSection
            onPressItem={podcast => this.onPressPodcastListItem(podcast, navigation)
            }
            navigation={navigation}
            featured={featured}
          />
          <RelatedAuthors
            relatedAuthors={relatedAuthors}
          />
        </Animated.ScrollView>
      </Fragment>
    );
  };

  getAppTheme = (): Object => {
    const { navigation } = this.props;
    const {
      state: { params },
    } = navigation;

    const theme = params[CONSTANTS.PARAMS.APP_THEME];

    return theme;
  };

  getBarStyle = (): string => {
    const theme = this.getAppTheme();
    const barStyle = theme.colors.secondaryColor === '#111' ? 'light-content' : 'dark-content';

    return barStyle;
  };

  render() {
    const { navigation, loading, author } = this.props;

    const hasAuthorDefined = !!author;
    const barStyle = this.getBarStyle();

    return (
      <Container>
        <StatusBar
          backgroundColor="transparent"
          barStyle={barStyle}
          translucent
          animated
        />
        {loading || !hasAuthorDefined ? <Loading /> : this.renderContent()}
      </Container>
    );
  }
}

export default AuthorDetailComponent;
