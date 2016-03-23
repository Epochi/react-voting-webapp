import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'constants/index';


polyfill();


function makePostRequest(method, id, data, api='/p') {
  return request[method](api + (id ? ('/' + id) : ''), data);
}


//Post creation
function clearPostState() {
  return {type: types.types.POST_CLEAR_STATE};
}

export function createNewPost(data){
  return (dispatch, getState) => {
    dispatch(createNewPostRequest(data));
    
    return makePostRequest('post',undefined ,data,'/p/post')
        .then(res => {
          if(res.status === 200) {
            return dispatch(createPostSuccess());
          }
        })
        .catch(error => {
          return dispatch(createPostFailure({ error: 'Oops! What a poop, Something went wrong and we couldn\'t create your post'}));
        });
  };
}

function createNewPostRequest(data){
    return {
    type: types.CREATE_POST_REQUEST
  };
}
function createPostSuccess(data) {
  return {
    type: types.CREATE_POST_SUCCESS,
    data: data
  };
}

function createPostFailure(data) {
  return {
    type: types.CREATE_POST_FAILURE,
    error: data.error
  };
}

export function selectPort(port) {
  return {
    type: types.SELECT_PORT,
    port
  };
}

export function invalidatePort(port) {
  return {
    type: types.INVALIDATE_PORT,
    port
  };
}

export function likePost(index,permalink,liked){
  if(!liked){
    return dispatch => {
      dispatch(dislikedPost(index));
      return makePostRequest('put', undefined,{liked: false},permalink)
    }
  }else{
    return dispatch => {
      dispatch(likedPost(index));
      return makePostRequest('put', undefined,{liked: true},permalink)
    }
  }
}

function likedPost(index) {
  return { type: types.POSTS_LIKE, index };
}

function dislikedPost(index) {
  return { type: types.POSTS_UNLIKE, index };
}


export function fetchPosts(api='top') {
    return {
        type: types.POSTS_GET,
        promise: (client) => client.get('/top/.json')
    };
}
