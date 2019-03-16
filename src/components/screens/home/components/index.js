// @flow

import React from 'react';
import {
  View, StatusBar, TouchableOpacity, Text,
} from 'react-native';
import CONSTANTS from '~/utils/CONSTANTS';

type Props = {
  navigation: Object,
};

const HomeComponent = ({ navigation }: Props): Object => (
  <View
    style={{
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <StatusBar
      backgroundColor="transparent"
      barStyle="light-content"
      translucent
      animated
    />
    <TouchableOpacity
      onPress={() => navigation.navigate('TEST', {
        [CONSTANTS.PARAMS.PLAYLIST_TITLE]: 'MY_PLAYLIST',
      })
      }
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 4,
        backgroundColor: '#EF010B',
      }}
    >
      <Text
        style={{
          color: '#fff',
        }}
      >
        PLAYER
      </Text>
    </TouchableOpacity>
  </View>
);

export default HomeComponent;
