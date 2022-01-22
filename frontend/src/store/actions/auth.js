import { CALL_API } from "../api.middleware";
import {
  FETCH_USERS_PROGRESS,
  FETCH_USERS_SUCCESS,
  USER_LOGIN_PROGRESS,
  USER_LOGIN_SUCCESS,
  LOGOUT_SUCCESS
} from "../types";

export const login = (payload) => async (dispatch) => {
  return await dispatch({
    [CALL_API]: {
      types: [USER_LOGIN_PROGRESS, USER_LOGIN_SUCCESS],
      body: payload,
      url: `/users/login`,
      method: `POST`
    }
  });
};

export const fetchUsers = () => async (dispatch) => {
  let resp = await dispatch({
    [CALL_API]: {
      types: [FETCH_USERS_PROGRESS, FETCH_USERS_SUCCESS],
      url: `/users/list`,
      method: `GET`
    }
  });
  return resp;
};

export const logout = () => (dispatch) => {
  // Integrate API if any
  dispatch({ type: LOGOUT_SUCCESS });
};
