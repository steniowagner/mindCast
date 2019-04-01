// @flow

import React from 'react';
import { FlatList } from 'react-native';
import appStyles from '~/styles';

type Props = {
  dataset: Array<Object>,
  render: Function,
};

const List = ({ dataset, render }: Props): Object => (
  <FlatList
    renderItem={({ item, index }) => render(item, index)}
    style={{
      paddingHorizontal: appStyles.metrics.mediumSize,
      paddingTop: appStyles.metrics.largeSize,
      width: appStyles.metrics.width,
    }}
    showsVerticalScrollIndicator={false}
    keyExtractor={item => `${item.id}`}
    data={dataset}
  />
);

export default List;
