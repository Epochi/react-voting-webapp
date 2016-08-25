import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PostsView from 'components/Posts/PostsView';
import * as PostActions from 'actions/posts';
import {fetchPosts} from 'actions/posts';



function mapStateToProps(state, ownProps) {
  console.log('this ownprops')
  console.dir(ownProps);
  const {postsByPort, user, ui } = state;
  const posts = postsByPort
  const username = user.username;
  const selectedPort = ui.selectedPort;
  const authenticated = user.authenticated;
  return {
    posts,
    username,
    selectedPort,
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

