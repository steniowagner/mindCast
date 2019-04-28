import {
  call, select, delay, put,
} from 'redux-saga/effects';

import api from '~/services/api';
import { SERVER_URL } from 'react-native-dotenv';

import { getItemFromStorage } from '../../utils/AsyncStorageManager';
import { Creators as HomeCreators } from '../ducks/home';
import CONSTANTS from '../../utils/CONSTANTS';
import parseParams from './utils/parseParams';

export function* getHome() {
  try {
    const rawInterests = yield call(
      getItemFromStorage,
      CONSTANTS.KEYS.INTERESTS_STORAGE_KEY,
      [],
    );

    const interests = typeof rawInterests === 'string'
      ? JSON.parse(rawInterests)
      : rawInterests;

    const interestsSelected = interests
      .filter(interest => interest.isSelected)
      .map(interest => interest.title.toLowerCase());

    const { data } = yield call(api.get, '/home', {
      paramsSerializer: params => parseParams(params),
      params: { categories: interestsSelected },
    });

    yield put(HomeCreators.getHomeSuccess(data));
  } catch (err) {
    yield put(HomeCreators.getHomeFailure());
  }
}
