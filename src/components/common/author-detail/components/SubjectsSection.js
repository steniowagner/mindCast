// @flow

import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import SectionTitle from './SectionTitle';

const Wrapper = styled(View)`
  width: 100%;
  padding-right: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const SubjectItemWrapper = styled(View)`
  justify-content: center;
  align-items: center;
  margin-right: ${({ theme }) => theme.metrics.mediumSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.smallSize * 1.2}px;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  border-radius: 3px;
  background-color: #f0f;
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
`;

const SubjectsSection = (): Object => (
  <Wrapper>
    <SectionTitle
      title="Subjects"
    />
    <SubjectsWrapper>
      <SubjectItemWrapper>
        <SubjectItemText>#math</SubjectItemText>
      </SubjectItemWrapper>
      <SubjectItemWrapper>
        <SubjectItemText>#math</SubjectItemText>
      </SubjectItemWrapper>
      <SubjectItemWrapper>
        <SubjectItemText>#science</SubjectItemText>
      </SubjectItemWrapper>
      <SubjectItemWrapper>
        <SubjectItemText>#philosofy</SubjectItemText>
      </SubjectItemWrapper>
      <SubjectItemWrapper>
        <SubjectItemText>#technology</SubjectItemText>
      </SubjectItemWrapper>
    </SubjectsWrapper>
  </Wrapper>
);

export default SubjectsSection;
