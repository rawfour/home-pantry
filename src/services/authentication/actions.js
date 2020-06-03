import { AUTHENTICATION_STATE, SET_LOADING, REMOVE_LOADING } from 'services/actionTypes';
import { isInitialized, logout, updateUserProfile } from '../../firebase/index';

export const firebaseInitialized = () => async (dispatch) => {
  const value = await isInitialized();
  dispatch({
    type: AUTHENTICATION_STATE,
    payload: value,
  });
};

export const userLogout = () => async (dispatch) => {
  await logout();
  dispatch({
    type: AUTHENTICATION_STATE,
    payload: false,
  });
};

export const userEdit = (name) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
      payload: 'userEdit',
    });
    await updateUserProfile(name);

    dispatch({
      type: REMOVE_LOADING,
      payload: 'userEdit',
    });
  } catch (error) {
    alert(error.message);
  }
};
