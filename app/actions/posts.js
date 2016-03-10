import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'constants';

export const CREATE_POST = 'CREATE_POST';
export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_ERROR = 'CREATE_POST_ERROR';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';

export const POSTS_GET = 'POSTS_GET';
export const POSTS_GET_SUCCESS = 'POSTS_GET_SUCCESS';
export const POSTS_GET_FAILURE = 'POSTS_GET_FAILURE';
export const POSTS_GET_REQUEST = 'POSTS_GET_REQUEST';

export const SELECT_PORT = 'SELECT_PORT';
export const INVALIDATE_PORT = 'INVALIDATE_PORT';
  
export const POSTS_LIKE = 'POSTS_LIKE';
export const POSTS_UNLIKE = 'POSTS_UNLIKE';
export const POSTS_LIKE_REQUEST = 'POSTS_LIKE_REQUEST';
export const POSTS_UNLIKE_REQUEST = 'POSTS_UNLIKE_REQUEST';
export const POSTS_LIKE_SUCCESS = 'POSTS_LIKE_SUCCESS';
export const POSTS_UNLIKE_SUCCESS = 'POSTS_UNLIKE_SUCCESS';

polyfill();


function makePostRequest(method, id, data, api='/p') {
  return request[method](api + (id ? ('/' + id) : ''), data);
}


//Post creation
function clearPostState() {
  return {type: types.POST_CLEAR_STATE};
}

export function createNewPost(data){
    return {
      type: CREATE_POST,
      data,
      promise: makePostRequest('post',undefined,data,'/post')
    };
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

export function fetchPosts(data,id,api='top') {
  return {
    type: POSTS_GET,
    subport: api,
    promise: makePostRequest('get',id, undefined, api)
  };
}


export function likePost(index,permalink,liked){
  if(!liked){
    return{
      type: POSTS_LIKE,
      index,
      promise: makePostRequest('put',undefined, {liked: liked}, permalink)
    };
  }else{
   return{
      type: POSTS_UNLIKE,
      index,
      promise: makePostRequest('put',undefined, {liked: liked}, permalink)
    };
  }
}
