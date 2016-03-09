var update = require('react-addons-update');

import {SELECT_PORT,
  INVALIDATE_PORT,
  POSTS_LIKE,
  POSTS_UNLIKE,
  POSTS_LIKE_SUCCESS,
  POSTS_UNLIKE_SUCCESS,
  POSTS_GET, POSTS_GET_REQUEST, POSTS_GET_SUCCESS, POSTS_GET_FAILURE
} from 'actions/posts';

const initialState = {
    posts: []
};

function posts(state = initialState.posts, action) {
  switch (action.type) {
  case POSTS_GET_SUCCESS:
  return state = update(state, {$push: action.posts});
  case POSTS_LIKE_SUCCESS:
     return state = update(state, {[action.index]: {liked: {$set: true}}});
  case POSTS_UNLIKE_SUCCESS:
     return state = update(state, {[action.index]: {liked: {$set: false}}});
  default:
    return state;
  }
}


export function postsByPort(state = initialState, action) {
  switch (action.type) {
  case POSTS_GET_SUCCESS:
    let postsArray = [];
    if(action.req && action.req.data){
      let data = action.req.data;
      postsArray = data.map(post => post);
    }
    return {
        posts: posts(state.posts, {posts: postsArray, type: action.type})
      } ;
    case POSTS_LIKE_SUCCESS:
       return {
         posts: posts(state.posts, {index: action.index, type: action.type})
       };
        case POSTS_UNLIKE_SUCCESS:
       return {
         posts: posts(state.posts, {index: action.index, type: action.type})
       };   
  default:
    return state;
  }
}

//  case POSTS_LIKE_SUCCESS:
