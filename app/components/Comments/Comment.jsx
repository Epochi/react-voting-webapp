import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'scss/components/_comments-tree';
const cx = classNames.bind(styles);


const Comment = ({comment, childComments}) => {

 return(
      <div className={cx("comment-tree__thread")}>
        <div className={cx("comment-tree__comment")}>
            {comment}
        </div>
        {childComments}
      </div>
        );
 
};

/*
Comment.propTypes = {
  handleVote: PropTypes.func,
  votes: PropTypes.object,
  type:PropTypes.string
};
*/

export default Comment;


