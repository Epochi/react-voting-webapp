var update = require('react-addons-update');

import {SELECT_PORT,
  INVALIDATE_PORT,
  CREATE_POST, CREATE_POST_REQUEST,CREATE_POST_FAILURE,CREATE_POST_SUCCESS,
  POSTS_VOTE,
  POSTS_UNVOTE,
  POSTS_GET, POSTS_GET_SUCCESS, POSTS_GET_FAILURE,
  POSTS_DELETE_REQUEST,
  POSTS_DELETE_SUCCESS,
  POSTS_DELETE_FAILURE,
  POSTS_SAVE,
  POSTS_UNSAVE,
  POST_GET,
  POST_GET_SUCCESS,
  COMMENTS_GET_SUCCESS,
  POST_OPEN_STATE,
  POSTS_NEW_PAGE
} from 'constants/index';

const initialState = {
    posts: [],
    pages: {}
};





function posts(state = initialState.posts, action) {
  switch (action.type) {
  case POSTS_GET_SUCCESS:
    return state = update(state, {$push: action.posts});
  case POSTS_VOTE:
     return state = update(state, {[action.index]: {post_vote: {$set: action.vote}, score: {$apply: (x) => {return x+1;}}}});
  case POSTS_UNVOTE:
     return state = update(state, {[action.index]: {v: {$set: 0}, score:{$apply: (x) => {return x-1;}}}});
  case POSTS_SAVE:
     return state = update(state, {[action.index]: {s: {$set: 1}}});
  case POSTS_UNSAVE:
     return state = update(state, {[action.index]: {s: {$set: 0}}});
  case CREATE_POST_SUCCESS:
     return state = update(state, {$unshift: [action.post] });
  case POSTS_DELETE_SUCCESS:
     return state = update(state, {[action.index]: {data: {hidden: {$set: true}}}});
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
    console.log('postsbyport action ')
    console.log(postsArray[0]);
        console.log('postsbyWHERE IS ITEM  action ')
    return {
        [action.subport]: posts(state[action.subport], {posts: postsArray, type: action.type})
      };
    case POSTS_VOTE:
          console.log('pARED args');
    console.log(action.data);
    console.log('pARED args');
       return {
         [action.data.subport]: posts(state[action.data.subport], {index: action.data.index,vote: action.data.vote, type: action.type})
       };
    case CREATE_POST_SUCCESS:
      let post = {...action.data,
        post_vote: 10
      };
       return {
         posts: posts(state.posts, {post: post, type: action.type})
       };  
    case POSTS_DELETE_SUCCESS:
       return {
         posts: posts(state.posts, {index: action.index, type: action.type})
       };
    case POSTS_NEW_PAGE:
      return  state.pages = update(state.pages, {[action.data.subport]: {$apply: (x) => {return x+1;}}})
  default:
    return state;
  }
}



export function postOpen(state={
 open: false,
 post: null,
 comments: null
}, action) {
  switch (action.type) {
  case POST_GET_SUCCESS:
    console.log('SINGLE POST GET SUCCESS');
    //console.log(action)
    console.log('SINGLE POST GET ACTION ITEM');
    return Object.assign({}, state, {
      post: action.req.data
    });
  case COMMENTS_GET_SUCCESS:
    return Object.assign({}, state, {
      comments: action.comments
    });
  case POST_OPEN_STATE:
    return Object.assign({}, state, {
      open: action.bool
    });
  default:
    return state;
  }
}




//     return state = update(state, {[action.index]: {post_vote: {$set: action.vote}, score: {$apply: (x) => {return x+1;}}}});