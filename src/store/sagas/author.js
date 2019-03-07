import {
  call, select, delay, put,
} from 'redux-saga/effects';

import { Creators as AuthorCreators } from '../ducks/author';

const AUTHORS = Array(3)
  .fill({
    profileImage:
      'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/reviewers/alex-holyoake.jpg',
    name: 'Alan Turing',
    subjects: ['math', 'science', 'philosofy', 'technology'],
    numberPodcasts: 17,
  })
  .map((item, index) => ({ ...item, id: index.toString() }));

export function* searchAuthorByName({ payload }) {
  try {
    yield delay(1000);
    yield put(AuthorCreators.searchAuthorByNameSuccess(AUTHORS));
  } catch (err) {
    yield put(AuthorCreators.searchAuthorByNameFailure());
  }
}
