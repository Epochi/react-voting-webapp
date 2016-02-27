import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import layout from 'material-design-lite/src/layout/_layout';
import palette from 'material-design-lite/src/palette/_palette';
const cx = classNames.bind(Object.assign(layout,palette));


const Toolbar = ({children, username, snackbar,logo}) => {  

    return (
          <header className={cx("mdl-layout__header","mdl-color--white", "mdl-color-text--grey-800")}>
            <div className={cx("mdl-layout__header-row")}>
              <span className={cx("mdl-layout-title")}>{logo}</span>
              <div className={cx("mdl-layout-spacer")}></div>
              <nav className={cx("mdl-navigation")} >
                  {children}
              </nav>   
            </div>
          </header>
  		);
  
};

Toolbar.propTypes = {
  children: PropTypes.node,
  logo: PropTypes.node,
  username: PropTypes.string
  
};

export default Toolbar;