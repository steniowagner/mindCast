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
  navigate: Function,
};

const SubjectsList = ({ navigate }: Props): Object => (
  <FlatList
    renderItem={({ item, index }) => (
      <SubjectsListItem
        title={item.title}
        onPress={() => navigate(CONSTANTS.NAVIGATE_SUBJECT_DETAIL, {
          [CONSTANTS.SUBJECT_DETAIL_PARAMS]: item,
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
