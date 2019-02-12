// @flow

import React, { Fragment } from 'react';
import { View, Text } from 'react-native';
import RNFS from 'react-native-fs';
import { Provider } from 'react-redux';
import Video from 'react-native-video';
import './config/ReactotronConfig';

import store from './store';

const App = (): Object => {
  console.log(RNFS.MainBundlePath);
  console.log(RNFS.DocumentDirectoryPath);
  return (
    <Fragment>
      <Provider
        store={store}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f0f',
          }}
        >
          <Video
            source={{ uri: '' }}
            audioOnly
            playInBackground
            style={{ width: 800, height: 800 }}
            resizeMode="cover"
            repeat
            volume={4.0}
            rate={1.0}
            ignoreSilentSwitch="ignore"
            onLoad={() => console.log('loaded')}
            onProgress={() => console.log('loading')}
          />
        </View>
      </Provider>
    </Fragment>
  );
};
export default App;
