import { USER_LOGIN_SUCCESS } from "../types/auth";
const initialState = {
  token: null
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS: {
      const { token, ...others } = action.body;
      return { ...state, token, ...others };
    }
    default:
      return state;
  }
}
