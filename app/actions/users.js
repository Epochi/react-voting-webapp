// Including es6-promise so isomorphic fetch will work
import 'es6-promise';
import fetch from 'isomorphic-fetch';

import * as types from 'constants';

// Note this can be extracted out later
/*
 * Utility function to make AJAX requests using isomorphic fetch.
 * You can also use jquery's $.ajax({}) if you do not want to use the
 * /fetch API.
 * @param Object Data you wish to pass to the server
 * @param String HTTP method, e.g. post, get, put, delete
 * @param String endpoint - defaults to /login
 * @return Promise
 */
function makeUserRequest(method, data, api='/auth/login') {
  return fetch(api, {
    method: method,
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

//clear local login and signup form and error fields
export function clearLoginDialogs() {
  return { type: types.CLEAR_LOGIN_DIALOGS };
}

// Log In Action Creators
function localLoginStart() {
  return { type: types.LOCAL_LOGIN_USER_START };
}

function localLoginSuccess(username) {
  console.log('login success user');
  console.log(username);
  return { type: types.LOCAL_LOGIN_SUCCESS_USER, username };
}

export function localLoginError(errors) {
  console.log(errors);
  return { type: types.LOCAL_LOGIN_ERROR_USER, errors };
}

function localLoginErrorDelegator(error) {
  console.log(arguments);
  var errors = {};
  for(var errorPath in error){
    errors[error[errorPath].path] = error[errorPath].message;
    }
  return dispatch => {
    dispatch(localLoginError(errors));
  };
  
}





export function localLogin(data) {
  return dispatch => {
    dispatch(localLoginStart());
    console.log(data);
    return makeUserRequest('post', data, '/auth/login')
         .then(response => {
                let json = response.json();
                console.dir(response);
                console.dir(json);
                if (response.status >= 400) {
                    return json.then(err => Promise.reject(err));
                } else {
                  return json;
                }
                
            })
            .then((json) => dispatch(localLoginSuccess(json.username)))
            .catch(({errors}) => dispatch(localLoginErrorDelegator(errors)));
  };
}

export function localLoginFormUpdate(key, value) {
  return { type: types.LOCAL_LOGIN_FORM_UPDATE, key, value };
}

// Log Out Action Creators
export function logOut() {
  return dispatch => {
    dispatch(beginLogout());
    return fetch('/auth/logout', {
      method: 'get',
      credentials: 'same-origin',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    })
      .then( response => {
        console.log("logout response: " + response.status);
        if (response.status < 400) {
          return dispatch(logoutSuccess());
        } else {
          return dispatch(logoutError());
        }
      });
  };
}

function beginLogout() {
  console.log('logOut dispatched');
  return { type: types.LOGOUT_USER};
}

function logoutSuccess() {
  console.log('logOut sucess');
  return { type: types.LOGOUT_SUCCESS_USER};
}

function logoutError() {
  return { type: types.LOGOUT_ERROR_USER};
}




//Email Sign Up Action Creators
export function emailSignUpFormUpdate(key, value) {
  return { type: types.EMAIL_SIGNUP_FORM_UPDATE, key, value };
}
function emailSignUpStart() {
  return { type: types.EMAIL_SIGNUP_START };
}
function emailSignUpComplete(user) {
  return { type: types.EMAIL_SIGNUP_COMPLETE, user };
}
function emailSignUpError(errors) {
  return { type: types.EMAIL_SIGNUP_ERROR, errors};
}

function emailSignUpErrorDelegator(error) {
  console.log(arguments);
  var errors = {};
  for(var errorPath in error){
    errors[error[errorPath].path] = error[errorPath].message;
    }
  return dispatch => {
    dispatch(emailSignUpError(errors));
  };
  
}


export function emailSignUp(data) {
  return dispatch => {
    dispatch(emailSignUpStart());
    
    return makeUserRequest('post', data, '/auth/signup')
         .then(response => {
                let json = response.json();
                if (response.status >= 400) {
                    console.dir(json);
                    return json.then(err => Promise.reject(err));
                } else {
                  return json;
                }
                
            })
            .then(({data}) => dispatch(emailSignUpComplete(data)))
            .catch(({errors}) => dispatch(emailSignUpErrorDelegator(errors)));
      
      

  };
}