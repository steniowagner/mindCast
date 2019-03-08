// @flow

import React, { PureComponent, Fragment } from 'react';
import { Animated, View } from 'react-native';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';

import ProgressiveImage from '~/components/common/ProgressiveImage';
import Loading from '~/components/common/Loading';
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
  loading: boolean,
  error: boolean,
  author: AuthorProps,
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

  renderContent = (author: AuthorProps): Object => {
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
            newReleases={newReleases}
          />
          <FeaturedSection
            featured={featured}
          />
          <RelatedAuthors
            relatedAuthors={relatedAuthors}
          />
        </Animated.ScrollView>
      </Fragment>
    );
  };

  render() {
    const { loading, error, author } = this.props;

    return (
      <Container>
        {loading ? <Loading /> : this.renderContent(author)}
      </Container>
    );
  }
}

export default AuthorDetailComponent;
