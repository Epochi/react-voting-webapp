var update = require('react-addons-update');

import {SELECT_PORT,
  INVALIDATE_PORT,
  CREATE_POST, CREATE_POST_REQUEST,CREATE_POST_FAILURE,CREATE_POST_SUCCESS,
  POSTS_VOTE,
  POSTS_UNVOTE,
  POSTS_GET, POSTS_GET_REQUEST, POSTS_GET_SUCCESS, POSTS_GET_FAILURE
} from 'constants/index';

const initialState = {
    posts: []
};

function posts(state = initialState.posts, action) {
  switch (action.type) {
  case POSTS_GET_SUCCESS:
  return state = update(state, {$push: action.posts});
  case POSTS_VOTE:
     return state = update(state, {[action.index]: {voted: {$set: true}, score: {$apply: (x) => {return x+1;}}}});
  case POSTS_UNVOTE:
     return state = update(state, {[action.index]: {voted: {$set: false}, score:{$apply: (x) => {return x-1;}}}});
  case CREATE_POST_SUCCESS:
     return state = update(state, {$unshift: [action.post] });
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
    case POSTS_VOTE:
       return {
         posts: posts(state.posts, {index: action.index, type: action.type})
       };
    case POSTS_UNVOTE:
       return {
         posts: posts(state.posts, {index: action.index, type: action.type})
       };   
    case CREATE_POST_SUCCESS:
      let post = {...action.req.data,
        voted: true
      };
       return {
         posts: posts(state.posts, {post: post, type: action.type})
       };   
  default:
    return state;
  }
}


