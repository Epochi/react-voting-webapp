import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'scss/components/_post';
const cx = classNames.bind(styles);

const PostListRefresh = ({postsError,postListRefresh}) => {
    return(
        <div className={cx("mdl-card","post","post-list-refresh")}>
            <div className={cx("mdl-card__supporting-text")}>{postsError}</div>
            <a className={cx("mdl-button", "mdl-button--colored")} onClick={postListRefresh}>Bandyti dar kartą</a>
        </div>
        );
};


export default PostListRefresh;
