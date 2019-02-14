// @flow

import { AsyncStorage } from 'react-native';

const APP_STORAGE_KEY = '@MIND_CAST';

export const KEYS = {
  PODCAST: 'PODCAST',
};

export const getItemFromStorage = async (
  key: string,
  defaultValue: any,
): any => {
  try {
    const value = (await AsyncStorage.getItem(`${APP_STORAGE_KEY}:${key}`)) || defaultValue;

    return value;
  } catch (error) {
    console.tron.log(error);
  }

  return defaultValue;
};

export const persistItemInStorage = async (
  key: string,
  value: any,
): Promise<void> => {
  try {
    await AsyncStorage.setItem(`${APP_STORAGE_KEY}:${key}`, value.toString());
  } catch (err) {
    console.tron.log(err);
  }
};

export const removeItemFromStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(`${APP_STORAGE_KEY}:${key}`);
  } catch (err) {
    console.tron.log(err);
  }
};
