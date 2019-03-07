import {
  call, select, delay, put,
} from 'redux-saga/effects';

import { Creators as SubjectCreators } from '../ducks/subject';

const PODCASTS = Array(7)
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
  .map((item, index) => ({ ...item, id: index.toString() }));

export function* getSubjectDetail({ payload }) {
  try {
    yield delay(1500);
    yield put(
      SubjectCreators.getSubjectDetailSuccess({
        thumbnailImageURL:
          'https://s2.glbimg.com/3auOxS3cG2mc_H5jFXDpxC7ol-w: /e.glbimg.com/og/ed/f/original/2016/09/12/dr-alan-turing-2956483.jpg',
        imageURL:
          'https://s2.glbimg.com/3auOxS3cG2mc_H5jFXDpxC7ol-w=/e.glbimg.com/og/ed/f/original/2016/09/12/dr-alan-turing-2956483.jpg',
        items: {
          trending: PODCASTS,
          featured: PODCASTS,
          authors: PODCASTS,
        },
      }),
    );
  } catch (err) {
    yield put(SubjectCreators.getSubjectDetailFailure());
  }
}
