// @flow

import React, { Fragment } from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import AuthorsListItem from '~/components/common/AuthorsListItem';
import DefaultButton from '~/components/common/DefaultButton';
import SectionTitle from '~/components/common/SectionTitle';

const Wrapper = styled(View)`
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
`;

const Section = styled(View)`
  margin-vertical: ${({ theme }) => theme.metrics.largeSize}px;
`;

const SectionContentWrapper = styled(View)`
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
  padding: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.lightSecondaryColor};
  border-radius: 4px;
`;

const AuthorDetailWrapper = styled(View)`
  width: 100%;
  height: 100%;
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
`;

const PodcastDescriptionText = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.1}px;
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
  onPressDetail,
  description,
  author,
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
        <AuthorDetailWrapper>
          <AuthorsListItem
            onPressItem={onPressDetail}
            author={author}
          />
        </AuthorDetailWrapper>
      </Section>
    )}
  </Wrapper>
);

export default BottomContent;
