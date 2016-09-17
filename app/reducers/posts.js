var update = require('react-addons-update');

import {SELECT_PORT,
  INVALIDATE_PORT,
  LOCAL_LOGIN_SUCCESS_USER,
  CREATE_POST, CREATE_POST_REQUEST,CREATE_POST_FAILURE,CREATE_POST_SUCCESS,
  POSTS_VOTE,
  POSTS_GET, POSTS_GET_SUCCESS, POSTS_GET_FAILURE,
  POSTS_DELETE_REQUEST,
  POSTS_DELETE_SUCCESS,
  POSTS_DELETE_FAILURE,
  POST_GET,
  POST_GET_SUCCESS,
  COMMENTS_GET_SUCCESS,
  POST_OPEN_STATE,
  POSTS_NEW_PAGE,
  POSTS_CLEAR_STATE,
  POST_OPEN_INDEX,
  POST_COMMENTS_GET_REQUEST,
  POST_COMMENTS_GET_FAILURE,
  POST_COMMENTS_GET_SUCCESS,
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
     //let newVotes = Object.assign({},state[action.index].votes, action.votes);
     return state = update(state, {[action.index]: {votes: {$apply: function(x) {return Object.assign({},x,action.vote);}}}});
  case CREATE_POST_SUCCESS:
     return state = update(state, {$unshift: [action.post] });
  case POSTS_DELETE_SUCCESS:
     return state = update(state, {[action.index]: {data: {hidden: {$set: true}}}});
  default:
    return state;
  }
}

function pages(state = initialState.pages, action) {
  switch (action.type) {
  case POSTS_GET_SUCCESS:
    return state = update(state, {[action.subport]: {$apply: (x) => {return ~~x+1;}}});
  default:
    return state;
  }
}

export function postsByPort(state = initialState, action) {
  switch (action.type) {
  case POSTS_GET_SUCCESS:
    let postsArray = [];
    if(action.req && action.req.data && action.req.data.posts){
      console.log('action.req thang');
      console.log(action.req);
      let data = action.req.data.posts;
      postsArray = data.map(posts => posts);
    }
    //console.log('PBP STATE START');
    //console.log(postsArray);
    //console.log('PBP STATE END');
    return {
        pages: pages(state["pages"], {subport: action.subport, type: action.type}),
        [action.subport]: posts(state[action.subport], {posts: postsArray, type: action.type})
      };
    case POSTS_VOTE:
    console.log('POSTS_VOTE args');
    console.log(action.data);
    console.log('POSTS_VOTE args END');
       return {
         [action.data.subport]: posts(state[action.data.subport], {index: action.data.index, vote: action.data.vote.votes, type: action.type})
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
    case POSTS_CLEAR_STATE:
      return state = initialState;
  default:
    return state;
  }
}



export function postOpen(state={
 index: false,
 post: null,
 commentPostId: null,
 comments: null
}, action) {
  switch (action.type) {
  case POST_GET_SUCCESS:
    //console.log('SINGLE POST GET SUCCESS');
    //console.log(action)
    //console.log('SINGLE POST GET ACTION ITEM');
    return Object.assign({}, state, {
      post: action.req.data
    });
  case COMMENTS_GET_SUCCESS:
    return Object.assign({}, state, {
      comments: action.comments
    });
  case POST_OPEN_INDEX:
    return Object.assign({}, state, {
      index: action.index
    });
  case POST_COMMENTS_GET_REQUEST:
    return Object.assign({}, state, {
      commentPostId: action.post_id
    });
  default:
    return state;
  }
}