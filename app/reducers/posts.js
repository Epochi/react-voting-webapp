import {GET_POSTS,
  POSTS_GET_SUCCESS,
  POSTS_GET_FAILURE,
  POSTS_GET_REQUEST,
  SELECT_PORT,
  INVALIDATE_PORT
} from 'actions/posts'


function posts(state = {
  error: {},
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case INVALIDATE_PORT:
    return Object.assign({}, state, {
      didInvalidate: true
    }); 
  case POSTS_GET_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    });
  case POSTS_GET_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      items: action.posts,
      lastUpdated: action.receivedAt
    });
  case POSTS_GET_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false
    });
  default:
    return state;
  }
}

export function selectedPort(state = 'hot', action) {
  switch (action.type) {
  case SELECT_PORT:
    return action.port;
  default:
    return state;
  }
}

export function postsByPort(state = { }, action) {
  switch (action.type) {
  case INVALIDATE_PORT:
  case POSTS_GET_REQUEST:
  case POSTS_GET_SUCCESS:
    let postsArray = [];
    if(action.req && action.req.data){
      let data = action.req.data;
      postsArray = data.map(function(child){
        return child;
      });
    }
    return Object.assign({}, state, {
      [action.port]: posts(state[action.port], {
        type: action.type,
        port: action.port,
        posts: postsArray,
        receivedAt: Date.now()
      })
    });

  case POSTS_GET_FAILURE:
    return Object.assign({}, state, {
      [action.port]: posts(state[action.port], {
        type: action.type,
        port: action.port,
        posts: [],
        receivedAt: Date.now(),
        error : {
          status: action.error.status,
          statusText : action.error.statusText
        }
      })
    });

  default:
    return state;
  }
}


