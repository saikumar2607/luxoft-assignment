import { USER_LOGIN_SUCCESS, FETCH_USERS_SUCCESS, LOGOUT_SUCCESS } from "../types/auth";
const initialState = {
  token: null
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS: {
      const { token, ...others } = action.body;
      return { ...state, token, ...others };
    }
    case LOGOUT_SUCCESS:
      return { ...state, token: null };
    default:
      return state;
  }
}

export function userReducer(state = { list: [] }, action) {
  switch (action.type) {
    case FETCH_USERS_SUCCESS: {
      const { list } = action.body;
      return { ...state, list };
    }
    default:
      return state;
  }
}
