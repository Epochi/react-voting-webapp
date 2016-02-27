import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from 'scss/components/_postsview';
import layout from 'material-design-lite/src/layout/_layout';

const cx = classNames.bind(Object.assign(styles, layout));

const PostsView = ({}) => {  {
    
    return (
    <div className={cx('mdl-layout__content',"height")}>    
        Posts are good
    </div>    
  		);
  }
};

PostsView.propTypes = {
};

export default PostsView;
