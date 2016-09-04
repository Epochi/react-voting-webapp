import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PostOpen from 'components/Posts/PostOpen';
import * as PostActions from 'actions/posts';
import {fetchPost} from 'actions/posts';



function mapStateToProps(state, ownProps) {
  const {postsByPort, user, ui, postOpen} = state;
  console.log('#PMPTP');
  const selectedPort = ui.selectedPort;
  const post = ownProps.location.state.hasOwnProperty("index") ? postsByPort[selectedPort][ownProps.location.state.index] : postOpen.post.post;
  const comments = postOpen.comments;
  const username = user.username;
  return {
    selectedPort,
    post,
    username,
    comments
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PostActions, dispatch);
}

const Post = connect(mapStateToProps,mapDispatchToProps)(PostOpen);
export default Post;

