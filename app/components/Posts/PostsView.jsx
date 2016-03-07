import React, { PropTypes, Component} from 'react';
import {Link} from 'react-router';
import classNames from 'classnames/bind';
import styles from 'scss/components/_postsview';
import layout from 'material-design-lite/src/layout/_layout';
import grid from 'material-design-lite/src/grid/_grid';
import Post from 'components/Posts/Post';

const cx = classNames.bind(Object.assign(styles, layout, grid));

//<i class="material-icons">thumb_up</i>

class PostsView extends Component {
  constructor(props) {
    super(props);
    this.handleLikePost = this.handleLikePost.bind(this);
  }

  componentDidMount() {
    const { selectedPort } = this.props;
    this.props.fetchPostsIfNeeded(selectedPort);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedPort !== this.props.selectedPort) {
      const { selectedPort } = nextProps;
      this.props.fetchPostsIfNeeded(selectedPort);
    }
  }
  
  handleLikePost(post, i){
    if(this.props.authenticated){
      var liked = post.liked ? true : false;
      console.log('liked or nat');
      console.log(liked);
      this.props.likePost(i, post.data.permalink, liked);
    }else {
       //give login dialog or little info card
    }
     
  }


  render () {
         const {posts, isFetching, lastUpdated, error, handleLikePost } = this.props;
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
  selectedPort: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  error: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  authenticated: PropTypes.bool.isRequired
};

export default PostsView;