import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import Header from 'components/UI/Header';
import { logOut, clearLoginDialogs } from 'actions/users';

/*
import classNames from 'classnames/bind';

import layout from 'material-design-lite/src/layout/_layout';
import palette from 'material-design-lite/src/palette/_palette';
const cx = classNames.bind(Object.assign(layout,palette));

UI.propTypes = {
  user: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
   return {
      handleClear: () => dispatch(clearLoginDialogs()),
      handleLogOut: () => dispatch(logOut())
   }
};


export default connect(mapStateToProps, mapDispatchToProps)(UI);
*/ 

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