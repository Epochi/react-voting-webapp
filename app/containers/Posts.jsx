import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import PostsView from 'components/Posts/PostsView';
import { logOut, clearLoginDialogs, createNewPost } from 'actions/users';

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated,
    isWaiting: state.user.isWaiting,
    username: state.user.username
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    handleLogOut: () => {
      dispatch(logOut())
    },
    handleClear: () => {
      dispatch(clearLoginDialogs())
    },
    handleNewPost: () => {
      dispatch(createNewPost())
    }
  }
}

const Posts = connect(mapStateToProps, mapDispatchToProps)(PostsView)

export default Posts