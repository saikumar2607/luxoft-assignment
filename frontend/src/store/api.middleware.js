import { SHOW_LOADING, SHOW_TOAST, STOP_LOADING, STOP_TOAST } from "./types";
// export const BASE_URL = "http://ec2-13-232-246-79.ap-south-1.compute.amazonaws.com/api";
export const BASE_URL = "http://localhost:5000/api";

const DEFAULT_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json"
};
async function invokeAPI(endpoint, config, token) {
  const headers = (token = {
    ...DEFAULT_HEADERS,
    Authorization: `Bearer ${token}`
  });
  const updatedConfig = { ...config, headers };
  const response = await fetch(BASE_URL + endpoint, updatedConfig);
  const body = await response.json();
  if (response.status === 401) {
    const { errors } = body;
    return { isError: true, errorMessage: errors[0].error };
  }
  if (response.status >= 400) {
    const { __globals = [], code, ...errors } = body;
    const [firstError] = [...Object.values(errors), ...__globals];
    return {
      isError: true,
      errorMessage: firstError[0].error || "Something went wrong"
    };
  }
  return { ...body };
}
export const CALL_API = "Call API";
const apiMiddleware = (store) => (next) => async (action) => {
  if (typeof action[CALL_API] === "undefined") {
    return next(action);
  }
  const { url, method, body = undefined, types = [], showLoading = true, showToaster, toastMessage } = action[CALL_API];
  const [requestType, successType] = types;
  const { auth } = store.getState();
  try {
    requestType && next({ type: requestType });
    showLoading && next({ type: SHOW_LOADING });

    const responseBody = await invokeAPI(
      url,
      {
        method,
        body: JSON.stringify(body)
      },
      auth.token || auth.access_token
    );
    if (responseBody.isError) {
      next({ type: SHOW_TOAST, message: responseBody.errorMessage });
      setTimeout(() => {
        next({ type: STOP_TOAST });
      }, 3000);
      return responseBody;
      // Handle error
    }
    successType &&
      next({
        body: { ...responseBody },
        type: successType
      });
    if (showToaster) {
      next({ type: SHOW_TOAST, message: toastMessage, severity: "success" });
      setTimeout(() => {
        next({ type: STOP_TOAST });
      }, 3000);
    }
    return responseBody;
  } catch (error) {
    if (error instanceof TypeError) {
      next({
        type: SHOW_TOAST,
        message: "Request failed. Please check your internet connection."
      });
    }
    if (error.isAuth) {
      next({ type: SHOW_TOAST, message: error.errorMessage });
    }
    setTimeout(() => {
      next({ type: STOP_TOAST });
    }, 3000);
    // Handle error
  } finally {
    next({ type: STOP_LOADING });
  }
};
export default apiMiddleware;
