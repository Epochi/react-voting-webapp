import React, { PropTypes, Component} from 'react';
import {Link} from 'react-router';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import styles from 'scss/components/_postsview';
import layout from 'material-design-lite/src/layout/_layout';
import grid from 'material-design-lite/src/grid/_grid';
import Post from 'components/Posts/Post';
import PostDropdown from 'components/Posts/PostDropdown';
import Portal from 'components/utils/Portal';

const cx = classNames.bind(Object.assign(styles, layout, grid));



class PostsView extends Component {
  constructor(props) {
    super(props);
    this.state = {openMenu: false};
    this.handleVotePost = this.handleVotePost.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
  }
  
  handleMenu(e){
    var rekt = e.currentTarget.getBoundingClientRect();
    var evt = {y: window.pageYOffset + rekt.bottom, x: rekt.left,target: e.currentTarget}; 
    
    Portal(evt,<PostDropdown/>,'postsmenu');
  }  

  
  handleVotePost(post, i){
   if(this.props.authenticated){
      let voted = post.voted ? true : false;
      console.log('voted or nat');
      console.log(voted);
      this.props.votePost(i, post._id, post.data.subport, voted);
    }
  }
  
  componentWillMount(){
    if(this.props.posts < 10)
    this.props.fetchPosts();
  }
  
  if


  render () {
         const {posts} = this.props;
                return (
                <main className={cx('mdl-layout__content',"main-view")}>
                    <div className={cx('mdl-grid','main-grid')}>
                          {posts.map((post, i) =>
                              <Post
                                key={i}
                                post={post}
                                onClick={() => this.handleVotePost(post, i)}
                                onMenuClick={this.handleMenu}
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