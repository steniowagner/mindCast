// @flow

import React from 'react';
import { FlatList } from 'react-native';

import SubjectsListItem from './SubjectListItem';
import CONSTANTS from '~/utils/CONSTANTS';

const items = [
  {
    id: 'technology',
    title: 'TECHNOLOGY',
  },
  {
    id: 'philosofy',
    title: 'PHILOSOFY',
  },
  {
    id: 'science',
    title: 'SCIENCE',
  },
  {
    id: 'literature',
    title: 'LITERATURE',
  },
  {
    id: 'pop-culture',
    title: 'POP CULTURE',
  },
  {
    id: 'history',
    title: 'HISTORY',
  },
];

type Props = {
  isTextInputFocused: boolean,
  navigate: Function,
};

const SubjectsList = ({ isTextInputFocused, navigate }: Props): Object => (
  <FlatList
    renderItem={({ item, index }) => (
      <SubjectsListItem
        isTextInputFocused={isTextInputFocused}
        title={item.title}
        onPress={() => navigate(CONSTANTS.ROUTES.SUBJECT_DETAIL, {
          [CONSTANTS.PARAMS.SUBJECT_DETAIL]: item,
        })
        }
        index={index}
      />
    )}
    showsVerticalScrollIndicator={false}
    keyExtractor={item => `${item.id}`}
    numColumns={2}
    data={items}
  />
);

export default SubjectsList;
