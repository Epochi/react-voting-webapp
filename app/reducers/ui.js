import {
  SELECT_PORT,
  LOCAL_LOGIN_USER,
  LOCAL_LOGIN_SUCCESS_USER,
  LOGIN_SUCCESS_USER,
  LOGIN_ERROR_USER,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  EMAIL_SIGNUP_COMPLETE,
  POST_CLEAR_STATE,
  POSTS_GET_REQUEST,
  POSTS_GET_SUCCESS,
  POSTS_GET_FAILURE,
  POSTS_DELETE_REQUEST,
  POSTS_DELETE_SUCCESS,
  POSTS_DELETE_FAILURE,
    CREATE_POST, CREATE_POST_REQUEST,CREATE_POST_FAILURE,CREATE_POST_SUCCESS
} from 'constants/index';


export default function ui(state={
  isWaiting: false,
  messageOpen: false,
  message: null,
  selectedPort: 'visi',
  uiSort: 'top',
  postsLoad: false,
  postsError: false
  }, action={}) {
  switch (action.type) {
    case LOGOUT_USER_REQUEST:
    case CREATE_POST_REQUEST:
    case POSTS_DELETE_REQUEST:
      return Object.assign({}, state, {
        isWaiting: true
      });
     case LOGOUT_USER_SUCCESS:
     case LOGOUT_USER_ERROR:
     case CREATE_POST_SUCCESS:
     case CREATE_POST_FAILURE:
     case POSTS_DELETE_SUCCESS:
     case POSTS_DELETE_FAILURE:
      return Object.assign({}, state, {
        isWaiting: false
      });
    case POSTS_GET_REQUEST:
      return Object.assign({},state,{
        postsLoad: true,
        postsError: false
      });
    case POSTS_GET_SUCCESS:
      return Object.assign({},state,{
        postsLoad: false
      });
    case POSTS_GET_FAILURE:
      return Object.assign({},state,{
        postsLoad: false,
        postsError: action.error.data.err.message
      });
    case SELECT_PORT:
      return Object.assign({},state,{
        selectedPort: action.subport
      });
    default:
      return state;
  }
}
