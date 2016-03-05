import React, { Component, PropTypes } from 'react';
import UI from 'containers/UI';
import Snackbar from 'containers/Snackbar'
import 'scss/main';
import classNames from 'classnames/bind';
import layout from 'material-design-lite/src/layout/_layout';

const cx = classNames.bind(layout);

const App = ({children}) => {
  return (
    <div className={cx("mdl-layout__container")}>
      <div className={cx("mdl-layout","mdl-layout--fixed-header")}>
      <UI />
        {children}
      <Snackbar />  
      </div>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object
};

export default App;