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
            console.log(res);
            return dispatch(createPostSuccess(res.data));
          }
        })
        .catch(error => {
          return dispatch(createPostFailure({ error: 'Oops! What a poop, Something went wrong and we couldn\'t create your post '+error}));
        });
  };
}

function createNewPostRequest(){
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

//add type or smh(switch function again?)

//if voted true, do unvote
export function vote(data){
    return dispatch => {
      dispatch(voteAction(data.index,data.vote.vote));
      postAction(data);
    };
}

function voteAction(index,vote) {
  return { type: types.POSTS_VOTE, data: {index: index, vote: vote}};
}

function postAction(data){
    console.log('pA args');
    console.log(arguments);
    console.log('pA args');
    return makePostRequest('put', 'vote',{vote: {type: 0, state: data.state,post_id: data.id}})
      .then(function(response) {
        console.log("Vote Success!", response.status);
      }, function(error) {
        console.error("Vote Failed! ", error);
      });
}


/*
export function votedPost(index,id,subport,voted){
  console.log("votePost insideWHERE IS THIS: "+voted);
  if(voted === 1){
    return dispatch => {
      dispatch(unvotePost(index,voted));
      return makePostRequest('put', id,{voted: voted})
      .then(function(response) {
        console.log("UnVote Success!", response.status);
      }, function(error) {
        console.error("Vote Failed! ", error);
      });
    }
  }else{
    return dispatch => {
      dispatch(upvotePost(index,voted));
      return makePostRequest('put', id,{voted: voted})
            .then(function(response) {
        console.log("Vote Success!", response.status);
      }, function(error) {
        console.error("Vote Failed! ", error);
      });
    }
  }
}
*/



export function fetchPosts(page='0',api='top') {
    return {
        type: types.POSTS_GET,
        promise: (client) => client.get(`/p/${api}/${page}/.json`)
    };
}


export function deletePost(id,index,cb){
    return dispatch => {
      dispatch(deleteRequest());
      return makePostRequest('delete', id)
      .then(function(response) {
        if(response.status === 200){dispatch(deleteSuccess(index))
          if(cb){cb()}
        }
        else{dispatch(deleteFailure())
         if(cb){cb()}
        }
      }, function(error) {
        //dispatch(deleteFailure());
        console.error("delete Failed ", error);
      });
    }
}

function deleteRequest(){
  return {type: types.POSTS_DELETE_REQUEST};
}
function deleteSuccess(index){
  return {type: types.POSTS_DELETE_SUCCESS, index};
}
function deleteFailure(){
  return {type: types.POSTS_DELETE_FAILURE};
}