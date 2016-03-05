import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from 'scss/components/_postsview';
import layout from 'material-design-lite/src/layout/_layout';
import grid from 'material-design-lite/src/grid/_grid';
import Post from 'components/Posts/Post';


const cx = classNames.bind(Object.assign(styles, layout,grid));

const PostsView = ({posts,postVote,postUnvote}) => {  {
    return (
    <main className={cx('mdl-layout__content',"main-view")}>
        <div className={cx('mdl-grid','main-grid')}>
            {posts.map(post =>
                  <Post
                    key={post._id}
                    score={post.score}
                    {...post.data}
                    
                />
                )
            }
        </div>
    </main>    
  		);
  }
};

PostsView.propTypes = {
    posts: PropTypes.array,
    postVote: PropTypes.func,
    postUnvote: PropTypes.func
};

export default PostsView;

//<i class="material-icons">thumb_up</i>