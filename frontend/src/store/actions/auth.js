import { push } from "connected-react-router";
import { CALL_API } from "../api.middleware";
import { USER_LOGIN_PROGRESS, USER_LOGIN_SUCCESS } from "../types";

export const login = (payload) => async (dispatch) => {
  let resp = await dispatch({
    [CALL_API]: {
      types: [USER_LOGIN_PROGRESS, USER_LOGIN_SUCCESS],
      body: payload,
      url: `/users/login`,
      method: `POST`
    }
  });
  dispatch(push(`/profile`));
  return resp;
};

export const users = () => async (dispatch) => {
  let resp = await dispatch({
    [CALL_API]: {
      types: [USER_LOGIN_PROGRESS, USER_LOGIN_SUCCESS],
      url: `/users/login`,
      method: `GET`
    }
  });
  dispatch(push(`/profile`));
  return resp;
};
