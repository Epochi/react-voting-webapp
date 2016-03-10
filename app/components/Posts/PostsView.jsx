import React, { PropTypes, Component} from 'react';
import {Link} from 'react-router';
import classNames from 'classnames/bind';
import styles from 'scss/components/_postsview';
import layout from 'material-design-lite/src/layout/_layout';
import grid from 'material-design-lite/src/grid/_grid';
import Post from 'components/Posts/Post';

const cx = classNames.bind(Object.assign(styles, layout, grid));

class PostsView extends Component {
  constructor(props) {
    super(props);
    this.handleLikePost = this.handleLikePost.bind(this);
  }

  handleLikePost(post, i){
   if(this.props.authenticated){
      var liked = post.liked ? true : false;
      console.log('liked or nat');
      console.log(liked);
      this.props.likePost(i, post.data.permalink, liked);
    }
  }


  render () {
         const {posts } = this.props;
                return (
                <main className={cx('mdl-layout__content',"main-view")}>
                    <div className={cx('mdl-grid','main-grid')}>
                          {posts.map((post, i) =>
                              <Post
                                key={i}
                                post={post}
                                liked={post.liked ? post.liked : false}
                                onClick={() => this.handleLikePost(post, i)}
                            />
                        )}
                    </div>
                </main>
            );
  }
}

PostsView.propTypes = {
  posts: PropTypes.array.isRequired,
  authenticated: PropTypes.bool.isRequired
};

export default PostsView;