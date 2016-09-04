import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PostListFooterControl from 'components/utils/PostListFooterControl'

const mapStateToProps = (state) => {
  return {
    postsLoad: state.ui.postsLoad,
    postsError: state.ui.postsError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const PostListFooter = connect(mapStateToProps, mapDispatchToProps)(PostListFooterControl)

export default PostListFooter