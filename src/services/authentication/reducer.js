import { AUTHENTICATION_STATE } from 'services/actionTypes';

const initialState = {
  isAuth: false,
};

const userAuthenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATION_STATE:
      return {
        ...state,
        isAuth: action.payload,
      };
    default:
      return state;
  }
};

export default userAuthenticationReducer;
