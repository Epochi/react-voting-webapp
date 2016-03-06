import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PostsView from 'components/Posts/PostsView';
import * as PostActions from 'actions/posts';

PostsView.need = [
  PostActions.fetchPosts
];

function mapStateToProps(state) {
  let { selectedPort, postsByPort } = state;
  selectedPort = selectedPort.present;
  postsByPort = postsByPort.present;
  const {
    isFetching,
    lastUpdated,
    error,
    items: posts
  } = postsByPort[selectedPort] || {
    isFetching: true,
    error:{},
    items: []
  };

  return {
    posts,
    isFetching,
    lastUpdated,
    error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PostActions, dispatch);
}

const Posts = connect(mapStateToProps,mapDispatchToProps)(PostsView);
export default Posts;
























/*
const mapStateToProps = (state) => {
  return {
      postsByPort: state.posts.post
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postVote: (data) => {
      dispatch(postVoteRequest(data));
    }
  }
}

const Posts = connect(mapStateToProps, mapDispatchToProps)(PostsView)


export default Posts
*/