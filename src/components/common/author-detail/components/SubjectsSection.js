// @flow

import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import SectionTitle from '~/components/common/SectionTitle';

const Wrapper = styled(View)`
  width: 100%;
`;

const SubjectItemWrapper = styled(View)`
  justify-content: center;
  align-items: center;
  margin-right: ${({ theme }) => theme.metrics.mediumSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.smallSize * 1.2}px;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.black};
`;

const SubjectItemText = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.1}px;
  font-family: CircularStd-Bold;
  color: ${({ theme }) => theme.colors.white};
`;

const SubjectsWrapper = styled(View)`
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
`;

type Props = {
  subjects: Array<string>,
};

const SubjectsSection = ({ subjects }: Props): Object => (
  <Wrapper>
    <SectionTitle
      title="Subjects"
    />
    <SubjectsWrapper>
      {subjects.map(subject => (
        <SubjectItemWrapper
          key={subject}
        >
          <SubjectItemText>{`#${subject}`}</SubjectItemText>
        </SubjectItemWrapper>
      ))}
    </SubjectsWrapper>
  </Wrapper>
);

export default SubjectsSection;
