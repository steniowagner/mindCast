export const Types = {
  GET_SUBJECT_DETAIL_REQUEST: 'subject/GET_SUBJECT_DETAIL_REQUEST',
  GET_SUBJECT_DETAIL_SUCCESS: 'subject/GET_SUBJECT_DETAIL_SUCCESS',
  GET_SUBJECT_DETAIL_ERROR: 'subject/GET_SUBJECT_DETAIL_ERROR',
};

const INITIAL_STATE = {
  loading: true,
  error: false,
  data: null,
};

export const Creators = {
  getSubjectDetail: id => ({
    type: Types.GET_SUBJECT_DETAIL_REQUEST,
    payload: { id },
  }),

  getSubjectDetailSuccess: data => ({
    type: Types.GET_SUBJECT_DETAIL_SUCCESS,
    payload: { data },
  }),

  getSubjectDetailFailure: () => ({
    type: Types.GET_SUBJECT_DETAIL_ERROR,
  }),
};

const subject = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case Types.GET_SUBJECT_DETAIL_REQUEST:
      return {
        ...INITIAL_STATE,
      };

    case Types.GET_SUBJECT_DETAIL_SUCCESS:
      return {
        ...state,
        data: payload.data,
        loading: false,
      };

    case Types.GET_SUBJECT_DETAIL_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export default subject;
