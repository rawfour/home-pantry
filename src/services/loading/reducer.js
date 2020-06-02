import { SET_LOADING, REMOVE_LOADING } from '../actionTypes';

const initialState = {
  loading: {
    fetchList: false,
    fetchSingle: false,
    shoppingList: false,
  },
};

const loadingReducer = (state = initialState, action) => {
  const { loading } = state;
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: {
          ...loading,
          [action.payload]: true,
        },
      };
    case REMOVE_LOADING:
      return {
        ...state,
        loading: {
          ...loading,
          [action.payload]: false,
        },
      };
    default:
      return state;
  }
};

export default loadingReducer;
