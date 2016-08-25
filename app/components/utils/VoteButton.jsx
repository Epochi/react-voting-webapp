import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'material-design-lite/src/button/_button';
const cx = classNames.bind(styles);



const Button = ({onClick, children,css}) => {

    return(
          <a onClick={onClick} className={css}>
            {children}
          </a>
        );
    };

Button.propTypes = {
  onTouchTap: PropTypes.func,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

const VoteButton = ({onClick, vote, children}) => {

return(
  <a onClick={onClick}>
    {children}
  </a>
    );
};
VoteButton.propTypes = {
  onTouchTap: PropTypes.func,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default VoteButton;



