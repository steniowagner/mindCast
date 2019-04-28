// @flow

import React, { Fragment } from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import AuthorsListItem from '~/components/common/AuthorListItem';
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
  background-color: ${({ theme }) => theme.colors.secondaryColor};
  border-radius: 4px;
`;

const AuthorDetailWrapper = styled(View)`
  width: 100%;
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.secondaryColor};
  border-radius: 4px;
`;

const PodcastDescriptionText = styled(Text)`
  color: ${({ theme }) => theme.colors.textColor};
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.1}px;
`;

type Props = {
  shouldShowAuthorSection: boolean,
  onPressDetail: Function,
  description: string,
  author: Object,
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
