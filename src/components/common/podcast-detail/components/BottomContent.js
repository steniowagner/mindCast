// @flow

import React, { Fragment } from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import SectionTitle from '~/components/common/SectionTitle';
import DefaultButton from '~/components/common/DefaultButton';

const Wrapper = styled(View)`
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
`;

const Section = styled(View)`
  margin-vertical: ${({ theme }) => theme.metrics.largeSize}px;
`;

const SectionContentWrapper = styled(View)`
  padding: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.lightSecondaryColor};
  border-radius: 4px;
`;

const PodcastDescriptionText = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.1}px;
`;

const UploadTimestampText = styled(Text)`
  margin-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
  color: ${({ theme }) => theme.colors.subTextWhite};
  font-family: CircularStd-Book;
  font-size: ${({ theme }) => theme.metrics.mediumSize * 1.5}px;
`;

const AuthorImage = styled(FastImage).attrs(({ uri }) => ({
  source: { uri },
}))`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('15%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('15%')}px;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('7.5%')}px;
`;

const AuthorDetailWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const AuthorName = styled(Text).attrs({
  numberOfLines: 2,
  ellipsizeMode: 'tail',
})`
  color: ${({ theme }) => theme.colors.white};
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const TextContentWrapper = styled(View)`
  width: 75%;
  margin-left: ${({ theme }) => theme.metrics.largeSize}px;
`;

const LearnMoreButtonWrapper = styled(View)`
  width: 100%;
  align-items: flex-end;
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
`;

type Props = {
  shouldShowAuthorSection: boolean,
  onPressLearnMore: Function,
  authorImageURL: string,
  uploadedAt: string,
  description: string,
  authorName: string,
};

const BottomContent = ({
  shouldShowAuthorSection,
  onPressLearnMore,
  authorImageURL,
  uploadedAt,
  description,
  authorName,
}: Props): Object => (
  <Wrapper>
    <Section>
      <SectionTitle
        title="Description"
      />
      <SectionContentWrapper>
        <PodcastDescriptionText>{description}</PodcastDescriptionText>
      </SectionContentWrapper>
    </Section>
    {shouldShowAuthorSection && (
      <Section>
        <SectionTitle
          title="Author"
        />
        <SectionContentWrapper>
          <AuthorDetailWrapper>
            <AuthorImage
              uri={authorImageURL}
            />
            <TextContentWrapper>
              <AuthorName>{authorName}</AuthorName>
              <UploadTimestampText>
                {`Uploaded at ${uploadedAt}`}
              </UploadTimestampText>
            </TextContentWrapper>
          </AuthorDetailWrapper>
          <LearnMoreButtonWrapper>
            <View>
              <DefaultButton
                onPress={onPressLearnMore}
                size="large"
                text="LEARN MORE"
              />
            </View>
          </LearnMoreButtonWrapper>
        </SectionContentWrapper>
      </Section>
    )}
  </Wrapper>
);

export default BottomContent;
