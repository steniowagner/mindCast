export const Types = {
  SEARCH_AUTHOR_BY_NAME_REQUEST: 'authors/SEARCH_AUTHOR_BY_NAME_REQUEST',
  SEARCH_AUTHOR_BY_NAME_SUCCESS: 'authors/SEARCH_AUTHOR_BY_NAME_SUCCESS',
  SEARCH_AUTHOR_BY_NAME_ERROR: 'authors/SEARCH_AUTHOR_BY_NAME_ERROR',
};

const INITIAL_STATE = {
  authors: [],
  loading: false,
  error: false,
};

export const Creators = {
  searchAuthorByName: name => ({
    type: Types.SEARCH_AUTHOR_BY_NAME_REQUEST,
    payload: { name },
  }),

  searchAuthorByNameSuccess: data => ({
    type: Types.SEARCH_AUTHOR_BY_NAME_SUCCESS,
    payload: { data },
  }),

  searchAuthorByNameFailure: () => ({
    type: Types.SEARCH_AUTHOR_BY_NAME_ERROR,
  }),
};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case Types.SEARCH_AUTHOR_BY_NAME_REQUEST:
      return {
        ...state,
        authors: [],
        loading: true,
        error: false,
      };

    case Types.SEARCH_AUTHOR_BY_NAME_SUCCESS:
      return {
        ...state,
        loading: false,
        authors: payload.data,
      };

    case Types.SEARCH_AUTHOR_BY_NAME_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export default player;
