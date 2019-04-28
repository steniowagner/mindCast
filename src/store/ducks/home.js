export const Types = {
  GET_HOME_REQUEST: 'subject/GET_HOME_REQUEST',
  GET_HOME_SUCCESS: 'subject/GET_HOME_SUCCESS',
  GET_HOME_ERROR: 'subject/GET_HOME_ERROR',
};

const INITIAL_STATE = {
  loading: true,
  error: false,
  data: null,
};

export const Creators = {
  getHome: () => ({
    type: Types.GET_HOME_REQUEST,
  }),

  getHomeSuccess: data => ({
    type: Types.GET_HOME_SUCCESS,
    payload: { data },
  }),

  getHomeFailure: () => ({
    type: Types.GET_HOME_ERROR,
  }),
};

const subject = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case Types.GET_HOME_REQUEST:
      return {
        ...INITIAL_STATE,
      };

    case Types.GET_HOME_SUCCESS:
      return {
        ...state,
        data: payload.data,
        loading: false,
      };

    case Types.GET_HOME_ERROR:
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
