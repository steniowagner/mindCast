// @flow

import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';

import { connect } from 'react-redux';

import RecentlyPlayedListItem from './RecentlyPlayedListItem';
import appStyles from '~/styles';

type Props = {
  recentlyPlayed: Array<Object>,
  navigation: Object,
};

// class RecentlyPlayed extends PureComponent<Props, {}> {
//   state = {
//     recentlyPlayed: [],
//   };
// }

const RecentlyPlayed = ({ recentlyPlayed, navigation }): Object => (
  <FlatList
    renderItem={({ item, index }) => (
      <RecentlyPlayedListItem
        onPressItem={() => {}}
        podcast={item}
      />
    )}
    showsVerticalScrollIndicator={false}
    keyExtractor={item => `${item.id}`}
    data={recentlyPlayed}
    contentContainerStyle={{
      width: '100%',
      height: '100%',
      flex: 1,
      backgroundColor: appStyles.colors.dark,
    }}
  />
);

const mapStateToProps = state => ({
  recentlyPlayed: state.localPodcastsManager.recentlyPlayed,
});

export default connect(mapStateToProps)(RecentlyPlayed);
