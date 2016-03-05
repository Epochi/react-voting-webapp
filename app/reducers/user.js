import {
  LOCAL_LOGIN_USER,
  LOCAL_LOGIN_SUCCESS_USER,
  LOGIN_SUCCESS_USER,
  LOGIN_ERROR_USER,
  LOGOUT_USER,
  LOGOUT_SUCCESS_USER,
  LOGOUT_ERROR_USER,
  EMAIL_SIGNUP_COMPLETE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  POST_CLEAR_STATE
} from 'constants';


export default function user(state={
  isWaiting: false,
  authenticated: false,
  username:''
  }, action={}) {
  switch (action.type) {
    case LOCAL_LOGIN_USER:
    case CREATE_POST_REQUEST:
      return Object.assign({}, state, {
        isWaiting: true
      });
    case CREATE_POST_SUCCESS:
    case CREATE_POST_ERROR:
      return Object.assign({}, state, {
        isWaiting: false
      });
    case LOGIN_SUCCESS_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: true,
        username: action.username
      });
    case LOGIN_ERROR_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: false
      });
    case LOGOUT_USER:
      return Object.assign({}, state, {
        isWaiting: true
      });
    case LOGOUT_SUCCESS_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: false,
        username: ''
      });
    case LOGOUT_ERROR_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: true
      });
    case EMAIL_SIGNUP_COMPLETE:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: true
      });
    case LOCAL_LOGIN_SUCCESS_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: true,
        username: action.username
      });
    default:
      return state;
  }
}
