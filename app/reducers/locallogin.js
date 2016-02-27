import {
  LOCAL_LOGIN_USER_START,
  LOCAL_LOGIN_FORM_UPDATE,
  LOCAL_LOGIN_SUCCESS_USER,
  LOCAL_LOGIN_ERROR_USER,
  CLEAR_LOGIN_DIALOGS } from 'constants';


export default function locallogin(state={
  loading: false,
  errors: {},
  form: {} }, action={}) {
  switch (action.type) {
    case LOCAL_LOGIN_USER_START:
      return Object.assign({}, state, {
        errors: {},
        loading: true
      });
    case LOCAL_LOGIN_SUCCESS_USER:
      return Object.assign({}, state, {
      loading: false,
      errors: {},
      form: {}
      });
    case LOCAL_LOGIN_ERROR_USER:
      return Object.assign({}, state, {
        errors: action.errors,
        form: {
          ...state.form,
          password: ''
        }
      });
      case LOCAL_LOGIN_FORM_UPDATE:
      return Object.assign({}, state, {
        form: {
          ...state.form,
          [action.key]: action.value
        }
      });
      case CLEAR_LOGIN_DIALOGS:
      return Object.assign({}, state, {
      errors: {},
      form: {}
      });
    default:
      return state;
  }
}