import {
  call, select, put, delay,
} from 'redux-saga/effects';

import { Creators as AuthorCreators } from '../ducks/author';
import parseParams from './utils/parseParams';
import api from '~/services/api';

export function* searchAuthorByName({ payload }) {
  try {
    const { name } = payload;

    const { data } = yield call(api.get, '/authors/filter', {
      paramsSerializer: params => parseParams(params),
      params: { name },
    });

    yield put(AuthorCreators.searchAuthorByNameSuccess(data.authors));
  } catch (err) {
    yield put(AuthorCreators.searchAuthorByNameFailure());
  }
}

export function* getAuthorById({ payload }) {
  try {
    const { id } = payload;

    const { data } = yield call(api.get, `/authors/${id}`);

    yield put(AuthorCreators.getAuthorByIdSuccess(data.author));
  } catch (err) {
    yield put(AuthorCreators.getAuthorByIdFailure());
  }
}
