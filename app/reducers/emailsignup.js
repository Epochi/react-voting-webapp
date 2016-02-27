import {
  EMAIL_SIGNUP_START,
  EMAIL_SIGNUP_COMPLETE,
  EMAIL_SIGNUP_ERROR,
  EMAIL_SIGNUP_FORM_UPDATE,
  CLEAR_LOGIN_DIALOGS} from 'constants';

  export default function emailsignup(state={
  loading: false,
  errors: {},
  form: {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  } }, action={}) {
  switch (action.type) {
    case EMAIL_SIGNUP_START:
      return Object.assign({}, state, {
        errors: {},
        loading: true
      });
    case EMAIL_SIGNUP_COMPLETE:
      return Object.assign({}, state, {
      loading: false,
      errors: {},
      form: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      }
      });
    case EMAIL_SIGNUP_ERROR:
      return Object.assign({}, state, {
        errors: action.errors,
        form: {
          ...state.form,
          password: '',
          passwordConfirmation: ''
        }
      });
      case EMAIL_SIGNUP_FORM_UPDATE:
      return Object.assign({}, state, {
        form: {
          ...state.form,
          [action.key]: action.value
        }
      });
      case CLEAR_LOGIN_DIALOGS:
      return Object.assign({}, state, {
      errors: {},
      form: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      }
      });
    default:
      return state;
  }
}