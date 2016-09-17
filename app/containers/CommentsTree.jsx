import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CommentsTree from 'components/Comments/CommentsTree';
import * as PostActions from 'actions/posts';



function mapStateToProps(state, ownProps) {
  const {user, postOpen} = state;
  const comments = postOpen.comments;
  const commentPostId = postOpen.commentPostId;
  const username = user.username;
  const routeParamsPostId = ownProps.routeParamsPostId;
  const sort = state.ui.sort;
  return {
    username,
    comments,
    routeParamsPostId,
    commentPostId,
    sort
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PostActions, dispatch);
}

const CommentsTreeContainer = connect(mapStateToProps,mapDispatchToProps)(CommentsTree);
export default CommentsTreeContainer;

