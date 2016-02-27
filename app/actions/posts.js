// Including es6-promise so isomorphic fetch will work
import { polyfill } from 'es6-promise';
import fetch from 'isomorphic-fetch';
import md5 from 'spark-md5';
import * as types from 'constants';

polyfill();

let API_ENDPOINT = '/post';

// If this is a test, we must use an absolute url
if (__TEST__) {
  API_ENDPOINT = 'http://localhost:9876/post';
}


//Post creation

function createNewPost(type, content){
    return {type: types.CREATE_POST_NEW};
}
 
 
function makePostRequest(method, data) {
  return fetch(API_ENDPOINT, {
    method: method,
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

function increment(index) {
  return { type: types.INCREMENT_COUNT, index };
}

function decrement(index) {
  return { type: types.DECREMENT_COUNT, index };
}

function destroy(index) {
  return { type: types.DESTROY_TOPIC, index };
}


export function typing(text) {
  return {
    type: types.TYPING,
    newPost: text
  };
}

/*
 * @param data
 * @return a simple JS object
 */
function createPostRequest(data) {
  return {
    type: types.CREATE_TOPIC_REQUEST,
    id: data.id,
    count: data.count,
    text: data.text
  };
}

function createPostSuccess() {
  return {
    type: types.CREATE_TOPIC_SUCCESS
  };
}

function createPostFailure(data) {
  return {
    type: types.CREATE_TOPIC_FAILURE,
    id: data.id,
    ex: data.ex
  };
}

function createPostDuplicate() {
  return {
    type: types.CREATE_TOPIC_DUPLICATE
  };
}

// This action creator returns a function,
// which will get executed by Redux-Thunk middleware
// This function does not need to be pure, and thus allowed
// to have side effects, including executing asynchronous API calls.
export function createPost(text) {
  return (dispatch, getState) => {
    // If the text box is empty
    if (text.trim().length <= 0) return;

    const id = md5.hash(text);
    // Redux thunk's middleware receives the store methods `dispatch`
    // and `getState` as parameters
    const { post } = getState();
    const data = {
      id,
      count: 1,
      text
    };

    // Conditional dispatch
    // If the post already exists, make sure we emit a dispatch event
    if (post.posts.filter(postItem => postItem.id === id).length > 0) {
      // Currently there is no reducer that changes state for this
      // For production you would ideally have a message reducer that
      // notifies the user of a duplicate post
      return dispatch(createPostDuplicate());
    }

    // First dispatch an optimistic update
    dispatch(createPostRequest(data));

    return makePostRequest('post', data)
      .then(res => {
        if (res.ok) {
          // We can actually dispatch a CREATE_TOPIC_SUCCESS
          // on success, but I've opted to leave that out
          // since we already did an optimistic update
          // We could return res.json();
          return dispatch(createPostSuccess());
        } else {
          throw new Error("Oops! Something went wrong and we couldn't create your post");
        }
      })
      .catch(ex => {
        return dispatch(createPostFailure({ id, ex: ex.message }));
      });
  };
}

export function incrementCount(id, index) {
  return dispatch => {
    dispatch(increment(index));

    return makePostRequest('put', {
        id: id,
        isFull: false,
        isIncrement: true
      });
    // do something with the ajax response
    // You can also dispatch here
    // E.g.
    // .then(response => {});
  };
}

export function decrementCount(id, index) {
  return dispatch => {
    dispatch(decrement(index));
    return makePostRequest('put', {
        id: id,
        isFull: false,
        isIncrement: false
      });
    // do something with the ajax response
    // You can also dispatch here
    // E.g.
    // .then(response => {});
  };
}

export function destroyPost(id, index) {
  return dispatch => {
    dispatch(destroy(index));
    return makePostRequest('delete', {
        id: id
      });
    // do something with the ajax response
    // You can also dispatch here
    // E.g.
    // .then(response => {});
  };
}

