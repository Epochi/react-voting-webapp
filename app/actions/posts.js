import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'constants';

export const POSTS_GET = 'POSTS_GET';
export const POSTS_GET_SUCCESS = 'POSTS_GET_SUCCESS';
export const POSTS_GET_FAILURE = 'POSTS_GET_FAILURE';
export const POSTS_GET_REQUEST = 'POSTS_GET_REQUEST';

export const SELECT_PORT = 'SELECT_PORT';
export const INVALIDATE_PORT = 'INVALIDATE_PORT';
  
export const POSTS_LIKE = 'POSTS_LIKE';
export const POSTS_UNLIKE = 'POSTS_UNLIKE';
export const POSTS_LIKE_SUCCESS = 'POSTS_LIKE_SUCCESS';
export const POSTS_UNLIKE_SUCCESS = 'POSTS_UNLIKE_SUCCESS';

polyfill();

function makePostRequest(method, data, api='/post') {
  return request({
    url: api,
    method: method,
    data: data,
    withCredentials: true
  });
}





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
 


/*
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
*/

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
    };
}

function loadPosts(data){
  return {type: types.POSTS_LOAD_REQUEST, data};
}

function loadPostError(errors){
  
}

export function selectPort(port) {
  return {
    type: SELECT_PORT,
    port
  };
}

export function invalidatePort(port) {
  return {
    type: INVALIDATE_PORT,
    port
  };
}

export function fetchPosts(port='hot') {
  console.log('fetch posts: port   ' + port);
  return {
    type: POSTS_GET,
    port,
    promise: request.get('/'+ port)
  };
}

function shouldFetchPosts(state, port) {
  const posts = state.postsByPort[port];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export function fetchPostsIfNeeded(port) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), port)) {
      return dispatch(fetchPosts(port));
    }
  };
}

export function likePost(i,permalink,liked){
  console.log('like post func:_' + i);
  if(!liked){
    return{
      type: POSTS_LIKE,
      i,
      promise: makePostRequest('put', {liked: liked}, permalink)
    };
  }else{
   return{
      type: POSTS_UNLIKE,
      i,
      promise: makePostRequest('put', {liked: liked}, permalink)
    };
  }
}