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



export default function ui(state={
  isWaiting: false,
  messageOpen: false,
  message: null,
  newPost: {
      open: false
  },
  selectedPort: 'hot'
  }, action={}) {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return Object.assign({}, state, {
        isWaiting: true,
        newPost: {
            open: true
            }
      });        
    case CREATE_POST_SUCCESS:
      return Object.assign({}, state, {
        isWaiting: false,
        newPost: {
            open: false
            }
      });
    default:
      return state;
  }
}
