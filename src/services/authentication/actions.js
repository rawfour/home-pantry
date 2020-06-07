import { AUTHENTICATION_STATE } from 'services/actionTypes';
import {
  isInitialized,
  logout,
  updateUserName,
  // updateUserEmail,
  // reauthUser,
} from '../../firebase/index';

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

export const userEdit = (name) => async () => {
  // await reauthUser;
  // await updateUserEmail(email);
  await updateUserName(name);
};
