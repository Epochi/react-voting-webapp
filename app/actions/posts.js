// Including es6-promise so isomorphic fetch will work
import 'es6-promise';
import fetch from 'isomorphic-fetch';
import md5 from 'spark-md5';
import * as types from 'constants';


//Post creation
function createPostRequest() {
  return {type: types.CREATE_POST_REQUEST};
}

function createPostSucess() {
  return {type: types.CREATE_POST_SUCCESS};
}

function createPostError() {
  return {type: types.CREATE_POST_ERROR};
}

function clearPostState() {
  return {type: types.POST_CLEAR_STATE};
}

export function createNewPost(data){
  console.log("create new post");
   console.dir(data);
   
    return dispatch => {
      dispatch(createPostRequest());
      return makePostRequest('post', data, '/post')
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
            .then((json) => dispatch(createPostSucess()))
            .catch(({errors}) => dispatch(createPostError(errors)));
    };
}
 

 
function makePostRequest(method, data, api='/post') {
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


export function getPosts(){
      console.log("load posts");
      return dispatch => {
        return makePostRequest('get')
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
            .then((json) => dispatch(loadPosts(json)))
            .catch(({errors}) => dispatch(loadPostError(errors)));  
    }
}

function loadPosts(data){
  return {type: types.POSTS_LOAD_REQUEST, data}
};

function loadPostError(errors){
  
}