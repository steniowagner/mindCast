import { call, put } from 'redux-saga';

export function* downloadFile(x) {
  console.tron.log(x);
}

/*
  import {
  requestPermission,
  PERMISSIONS_TYPES,
} from '~/utils/AndroidPermissionsManager';
  const FILE_PREFIX = Platform.OS === 'android' ? 'file://' : '';
  // yield requestPermission(PERMISSIONS_TYPES.READ_EXTERNAL_STORAGE);

  yield persistItemInStorage(
    KEYS.PODCAST,
    JSON.stringify([
      {
        ...currentPodcast,
        path: `${FILE_PREFIX}${RNFS.ExternalDirectoryPath}/${
          currentPodcast.id
        }.mp3`,
      },
    ]),
  );

  yield call(RNFS.downloadFile, {
    fromUrl: 'https://s3-sa-east-1.amazonaws.com/gonative/1.mp3',
    toFile: `${FILE_PREFIX}${RNFS.ExternalDirectoryPath}/${
      currentPodcast.id
    }.mp3`,
    discretionary: true,
  });
*/
