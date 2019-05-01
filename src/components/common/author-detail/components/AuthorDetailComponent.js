// @flow

import React, { PureComponent, Fragment } from 'react';
import { Animated, View } from 'react-native';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';
import { StackActions } from 'react-navigation';

import ProgressiveImage from '~/components/common/ProgressiveImage';
import ErrorMessage from '~/components/common/ErrorMessage';
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
  categories: Array<string>,
  featured: Array<Object>,
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
    const pushAction = StackActions.push({
      routeName: CONSTANTS.ROUTES.PODCAST_DETAIL,
      params: {
        [CONSTANTS.KEYS.PODCAST_DETAIL_SHOULD_SHOW_AUTHOR_SECTION]: false,
        [CONSTANTS.PARAMS.PODCAST_DETAIL]: podcast,
      },
    });

    navigation.dispatch(pushAction);
  };

  renderContent = (author: Object, navigation: Object): Object => (
    <Fragment>
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
            thumbnailImageURL={author.thumbnailProfileImageURL}
            imageURL={author.profileImageURL}
          />
        </ImageWrapper>
      </Header>
      <Animated.View
        style={{
          opacity: this._scrollViewOffset.interpolate({
            inputRange: [
              0,
              appStyles.metrics.getHeightFromDP('25%'),
              appStyles.metrics.getHeightFromDP('30%'),
            ],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
          }),
        }}
      >
        <SmokeShadow />
      </Animated.View>
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
            name={author.name}
          />
        </SectionWrapper>
        <SectionWrapper>
          <AboutSection
            about={author.about}
          />
        </SectionWrapper>
        <SectionWrapper>
          <SubjectsSection
            subjects={author.categories}
          />
        </SectionWrapper>
        {author.podcasts.newReleases && author.podcasts.newReleases.length && (
          <NewReleasesSection
            onPressItem={podcast => this.onPressPodcastListItem(podcast, navigation)
            }
            newReleases={author.podcasts.newReleases}
            navigation={navigation}
          />
        )}
        {author.podcasts.featured && author.podcasts.featured.length > 0}
        <FeaturedSection
          onPressItem={podcast => this.onPressPodcastListItem(podcast, navigation)
          }
          navigation={navigation}
          featured={author.podcasts.featured}
        />
        {author.relatedAuthors && author.relatedAuthors.length > 0 && (
          <RelatedAuthors
            relatedAuthors={author.relatedAuthors}
          />
        )}
      </Animated.ScrollView>
    </Fragment>
  );

  render() {
    const {
      navigation, loading, author, error,
    } = this.props;

    return (
      <Container>
        {loading && <Loading />}
        {!loading
          && !error
          && !!author
          && this.renderContent(author, navigation)}
        {error && (
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

export default AuthorDetailComponent;
