import {
  POSTS_LOAD_REQUEST,
  CREATE_TOPIC_FAILURE,
  DESTROY_TOPIC,
  INCREMENT_COUNT,
  DECREMENT_COUNT } from 'constants';

const post = (state, action) => {
  switch (action.type) {
    case 'POSTS_LOAD_REQUEST':
      return {
        id: action.id,
        title: action.title,
        text: action.text,
        liked: action.liked
      };
    default:
      return state;
  }
};


const posts = (state = [], action) => {
  switch (action.type) {
      case 'POSTS_LOAD_REQUEST':
      return [
        ...state,
        post(undefined, action)
      ];
    default:
      return state;
  }
};

export default posts;