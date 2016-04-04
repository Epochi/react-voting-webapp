import {
  LOCAL_LOGIN_USER,
  LOCAL_LOGIN_SUCCESS_USER,
  LOGIN_SUCCESS_USER,
  LOGIN_ERROR_USER,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  EMAIL_SIGNUP_COMPLETE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  POST_CLEAR_STATE
} from 'constants/index';

export default function user(state={
  authenticated: false,
  username:''
  }, action={}) {
  switch (action.type) {
    case LOGIN_SUCCESS_USER:
      return Object.assign({}, state, {
        authenticated: true,
        username: action.username
      });
    case LOGIN_ERROR_USER:
      return Object.assign({}, state, {
        authenticated: false
      });
    case LOGOUT_USER_SUCCESS:
      return Object.assign({}, state, {
        authenticated: false,
        username: ''
      });
    case LOGOUT_USER_ERROR:
      return Object.assign({}, state, {
        authenticated: true
      });
    case EMAIL_SIGNUP_COMPLETE:
      return Object.assign({}, state, {
        authenticated: true,
        username: action.username
      });
    case LOCAL_LOGIN_SUCCESS_USER:
      return Object.assign({}, state, {
        authenticated: true,
        username: action.username
      });
    default:
      return state;
  }
}
