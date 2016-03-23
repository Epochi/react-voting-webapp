import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PostsView from 'components/Posts/PostsView';
import * as PostActions from 'actions/posts';
import {fetchPosts} from 'actions/posts';



function mapStateToProps(state) {
  const {postsByPort, user, ui } = state;
  const selectedPort = ui.selectedPort;
  const posts = postsByPort.posts
  const authenticated = user.authenticated;
  return {
    posts,
    authenticated
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PostActions, dispatch);
}

const Posts = connect(mapStateToProps,mapDispatchToProps)(PostsView);
Posts.need = [
  fetchPosts
  ];
export default Posts;

