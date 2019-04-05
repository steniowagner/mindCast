// @flow

import React from 'react';
import { FlatList } from 'react-native';
import { withTheme } from 'styled-components';

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
  theme: Object,
};

const SubjectsList = ({
  isTextInputFocused,
  navigate,
  theme,
}: Props): Object => (
  <FlatList
    renderItem={({ item, index }) => (
      <SubjectsListItem
        onPress={() => {
          console.tron.log('porra', theme.colors.textColor);
          navigate(CONSTANTS.ROUTES.SUBJECT_DETAIL, {
            [CONSTANTS.PARAMS.SUBJECT_DETAIL]: item,
            [CONSTANTS.PARAMS.APP_THEME]: theme,
          });
        }}
        isTextInputFocused={isTextInputFocused}
        title={item.title}
        index={index}
      />
    )}
    showsVerticalScrollIndicator={false}
    keyExtractor={item => `${item.id}`}
    numColumns={2}
    data={items}
  />
);

export default withTheme(SubjectsList);
