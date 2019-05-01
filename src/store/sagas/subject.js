import { call, select, put } from 'redux-saga/effects';

import { SERVER_URL } from 'react-native-dotenv';
import api from '~/services/api';

import { Creators as SubjectCreators } from '../ducks/subject';

export function* getSubjectDetail({ payload }) {
  try {
    const { id } = payload;

    const { data } = yield call(api.get, `/categories/${id}`);

    yield put(SubjectCreators.getSubjectDetailSuccess(data));
  } catch (err) {
    yield put(SubjectCreators.getSubjectDetailFailure());
  }
}
