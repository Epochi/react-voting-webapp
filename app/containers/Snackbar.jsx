import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SnackbarControl from 'components/utils/Snackbar'

const mapStateToProps = (state) => {
  return {
    isWaiting: state.ui.isWaiting,
    messageOpen: state.ui.messageOpen,
    message: state.ui.message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const Snackbar = connect(mapStateToProps, mapDispatchToProps)(SnackbarControl)

export default Snackbar