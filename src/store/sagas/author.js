import {
  call, select, delay, put,
} from 'redux-saga/effects';

import { Creators as AuthorCreators } from '../ducks/author';

const AUTHORS = Array(3)
  .fill({
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/reviewers/alex-holyoake.jpg',
    title: 'How solve puzzles can make you a better cryptographer',
    author: {
      thumbnailImageURL:
        'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/reviewers/alex-holyoake.jpg',
      name: 'Ada Lovelace',
      about:
        'English mathematician, computer scientist, logician, cryptanalyst, philosopher and theoretical biologist.',
      numberPodcasts: 7,
    },
    stars: 4.5,
  })
  .map((item, index) => ({ ...item, id: index }));

export function* searchAuthorByName({ payload }) {
  try {
    yield delay(1000);
    yield put(AuthorCreators.searchAuthorByNameSuccess(AUTHORS));
  } catch (err) {
    yield put(AuthorCreators.searchAuthorByNameFailure());
  }
}
