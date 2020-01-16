import { userService } from "../../services/user";

export const ACTION_TYPES = {
  LOGIN_REQUEST: "authentication/LOGIN_REQUEST",
  LOGIN_FAILURE: "authentication/LOGIN_FAILURE",
  LOGIN_SUCCESS: "authentication/LOGIN_SUCCESS",
  LOGOUT_REQUEST: "authentication/LOGOUT_REQUEST",
  LOGOUT_FAILURE: "authentication/LOGOUT_FAILURE",
  LOGOUT_SUCCESS: "authentication/LOGOUT_SUCCESS",
  GETSESSION: "authentication/GETSESSION"
};

const initialState = {
  loading: false,
  isAuthenticated: false,
  loginSuccess: false,
  loginError: false, // Errors returned from server side
  account: {},
  errorMessage: null, // Errors returned from server side
  sessionHasBeenFetched: false,
  idToken: null
};

// Reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_REQUEST:
    case ACTION_TYPES.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ACTION_TYPES.LOGIN_FAILURE:
    case ACTION_TYPES.LOGOUT_FAILURE:
      return {
        ...initialState,
        errorMessage: action.payload,
        loginError: true
      };
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loginError: false,
        loginSuccess: true
      };
    case ACTION_TYPES.LOGOUT_SUCCESS:
      return {
        ...initialState
      };
    case ACTION_TYPES.GETSESSION:
      return {
        ...state,
        loading: false,
        loginError: false,
        account: action.payload
      };
    default:
      return state;
  }
};

export function loginWithGoogle() {
  return dispatch => {
    dispatch(request());

    userService
      .loginWithGoogle()
      .then(function(result) {
        console.log(result);
        dispatch(success());
      })
      .catch(function(error) {
        console.log(error);
        dispatch(failure(error.message));
      });
  };

  function request() {
    return { type: ACTION_TYPES.LOGIN_REQUEST };
  }
  function success() {
    return { type: ACTION_TYPES.LOGIN_SUCCESS };
  }
  function failure(error) {
    return { type: ACTION_TYPES.LOGIN_FAILURE, payload: error };
  }
}

export function getSession() {
  return dispatch => {
    let account = userService.getSession();
    dispatch(resolve(account));

    function resolve(account) {
      return { type: ACTION_TYPES.GETSESSION, payload: account };
    }
  };
}

export const logout = () => dispatch => {};
export function logoutWithGoogle() {
  return dispatch => {
    dispatch(request());

    userService
      .logoutWithGoogle()
      .then(function(result) {
        console.log(result);
        dispatch(success());
      })
      .catch(function(error) {
        console.log(error);
        dispatch(failure(error.message));
      });
  };

  function request() {
    return { type: ACTION_TYPES.LOGOUT_REQUEST };
  }
  function success() {
    return { type: ACTION_TYPES.LOGOUT_SUCCESS };
  }
  function failure(error) {
    return { type: ACTION_TYPES.LOGOUT_FAILURE, payload: error };
  }
}
