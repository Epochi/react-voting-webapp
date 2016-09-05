import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'material-design-lite/src/button/_button';
const cx = classNames.bind(styles);


const VoteButton = ({handleVote, type, index, id, votes, children, authenticated}) => {
if(!authenticated) {
  return(
      <a onClick={()=>handleVote()} className={cx('vote__button','tooltip')}>
          {children}
      </a>
        );
} else{ 
  
   return(
      <a onClick={() => handleVote(id, index, {votes: {[type]: !votes[type] }} )} className={cx('vote__button','tooltip', votes[type] ? type : false)}>
        {children}
      </a>
        );
  }
};

VoteButton.propTypes = {
  handleVote: PropTypes.func,
  authenticated: PropTypes.bool,
  votes: PropTypes.object,
  type:PropTypes.string
};



export default VoteButton;


