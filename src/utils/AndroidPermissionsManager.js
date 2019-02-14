import { PermissionsAndroid } from 'react-native';

export const PERMISSIONS_TYPES = {
  WRITE_EXTERNAL_STORAGE: 'WRITE_EXTERNAL_STORAGE',
  READ_EXTERNAL_STORAGE: 'READ_EXTERNAL_STORAGE',
};

const PERMISSIONS = {
  [PERMISSIONS_TYPES.WRITE_EXTERNAL_STORAGE]: {
    type: 'WRITE_EXTERNAL_STORAGE',
    config: {
      title: 'MindCast App Create File Permission',
      message:
        'MindCast needs access to your storage '
        + 'so you can save your podcasts locally.',
    },
  },

  [PERMISSIONS_TYPES.READ_EXTERNAL_STORAGE]: {
    type: 'READ_EXTERNAL_STORAGE',
    config: {
      title: 'MindCast App Read File Permission',
      message:
        'MindCast needs access to your storage '
        + 'so you can listen your podcasts locally and offline.',
    },
  },
};

export const requestPermission = async (type) => {
  try {
    const permissionConfig = PERMISSIONS[type];

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS[type],
      {
        ...permissionConfig.config,
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.tron.log(err);
  }
};
