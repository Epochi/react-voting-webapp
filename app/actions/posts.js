import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'constants/index';


polyfill();


function makePostRequest(method, id, data, api='/api/post') {
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

export function selectPort(subport) {
  return {
    type: types.SELECT_PORT,
    subport
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
//postAction goes to server
//voteAction goes to store
export function vote(data){
    return dispatch => {
      dispatch(voteAction(data.index, data.subport, data.type ));
      postAction({post_id: data.post, votes: data.type});
    };
}

function voteAction(index, subport, vote) {
  return { type: types.POSTS_VOTE, data: {index: index, subport: subport, vote: vote}};
}

function postAction(data){
    console.log('pA args');
    console.log(data);
    console.log('pA args');
    return makePostRequest('put', `vote/${data.post_id}`, data.votes)
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


//port has to be an object, because SSR uses it as one
//send query{p: #page} object
export function fetchPosts(params = {}, query = {}) {
    var subport =  params.hasOwnProperty('subport') ? params.subport : 'visi'; 
    //LEAVE PAGE AT 0 WHILE THERE ARE NO POSTS
    var page = query.hasOwnProperty('page') ? ~~query.page : page=1;
    //CRASHES EVERYTHING
    var sort = query.hasOwnProperty('sort') ? query.sort : 'top';
    if(sort === 'top'){
      sort = 1;
    }else if(sort === 'hot'){
      sort = 0;
    } else if(sort === 'new'){
      sort = 2;
    }
    var queryString = `?page=${page}&sort=${sort}`;
    if(params.hasOwnProperty('postId')){
      queryString += `&post=${params.postId}`;
    }
    console.log('in fetchPosts request');
    console.log("argument params: " );
    console.dir(params);
    console.log("argument query: ");
    console.dir(query);
    console.log('before fetchPosts return');
    return {
          type: types.POSTS_GET,
          subport: subport,
          promise: (client) => client.get(`/api/post/${subport}/${queryString}`)
      };
}


export function fetchPostComments(port='all',postId) {
    console.log('in fetchPostComments');
    return {
          type: types.POST_COMMENTS_GET,
          promise: (client) => client.get(`/p/${postId}/.json`)
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

export function setPostOpenIndex(index){
  return {type: types.POST_OPEN_INDEX, index}; 
}

export function clearPosts(){
  return {type: types.POSTS_CLEAR_STATE}
}

