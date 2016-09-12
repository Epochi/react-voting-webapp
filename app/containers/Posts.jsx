import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PostsView from 'components/Posts/PostsView';
import * as PostActions from 'actions/posts';
import {fetchPosts, setPostOpenIndex} from 'actions/posts';



function mapStateToProps(state, ownProps) {
  //console.log('this ownprops')
  //console.dir(ownProps);
  const {postsByPort, user, ui, postOpen} = state;
  const posts = postsByPort;
  const username = user.username;
  const selectedPort = ui.selectedPort;
  const authenticated = user.authenticated;
  const routeParams = ownProps.routeParams;
  const sort = ui.sort;
  const postOpenIndex = postOpen.index
  return {
    posts,
    username,
    selectedPort,
    sort,
    authenticated,
    routeParams,
    postOpenIndex
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

