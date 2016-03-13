import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import Header from 'components/UI/Header';
import { logOut, clearLoginDialogs } from 'actions/users';


const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated,
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
    }
  }
}

const UI = connect(mapStateToProps, mapDispatchToProps)(Header)

export default UI