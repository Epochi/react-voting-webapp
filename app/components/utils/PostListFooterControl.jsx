import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'scss/components/_snackbar';
import Spinner from 'components/utils/Spinner';
import PostListRefresh from 'components/utils/PostListRefresh';
const cx = classNames.bind(styles);

const PostListFooterControl = ({postsLoad,postsError,postListRefresh}) => {
    
    
    return(
        <div className={cx("post-list-footer")}>
            {postsLoad ? (
                  <div className={cx("posts-loader")}>
                    <Spinner/>
                </div> 
                ) : (null)
            }
            {postsError ? (
                <div className={cx("posts-error")}>
                    <PostListRefresh postsError={postsError} postListRefresh={postListRefresh} />
                </div> 
            ): (null)}
        </div>
        )
    
};

PostListFooterControl.PropTypes = {
    postsLoad: PropTypes.bool,
    postsError: PropTypes.string
}


export default PostListFooterControl;
