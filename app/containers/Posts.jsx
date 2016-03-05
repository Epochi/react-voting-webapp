import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import PostsView from 'components/Posts/PostsView';
import { postVote,postUnvote } from 'actions/posts';

const mapStateToProps = (state) => {
  return {
      posts: state.posts.posts,
      voted: state.posts.voted
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    postVote: (id) => {
      dispatch(postUnvote(id))
    },
    postUnvote: (id) => {
      dispatch(postUnvote(id))
    }
  }
}

const Posts = connect(mapStateToProps, mapDispatchToProps)(PostsView)

export default Posts