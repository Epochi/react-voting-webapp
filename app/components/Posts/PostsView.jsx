import React, { PropTypes, Component} from 'react';
import classNames from 'classnames/bind';
import styles from 'scss/components/_postsview';
import layout from 'material-design-lite/src/layout/_layout';
import grid from 'material-design-lite/src/grid/_grid';
import Post from 'components/Posts/Post';
import PostDropdown from 'components/Posts/PostDropdown';
import {MenuPortal} from 'components/utils/Portal';
import {scrollThrottle} from 'components/utils.jsx';

const cx = classNames.bind(Object.assign(styles, layout, grid));



class PostsView extends Component {
  constructor(props) {
    super(props);
    this.handleVotePost = this.handleVotePost.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.scrollListener = this.scrollListener.bind(this);
    this.handleNewPosts = this.handleNewPosts.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
  }
  
  //don't update if username changes
  shouldComponentUpdate(nextProps,nextState){
    console.log(arguments);
      if(this.props.username !== nextProps.username){return false}
    return true;
  }
  
  
  handleMenu(e,post,index){
  var props = {event:e};
  if(this.props.username){
    props.id = post._id;
    props.username = this.props.username;
    if(this.props.username === post.data.author){
      props.author = post.data.author;
      props.funcs = {del: ()=>{this.handleDeletePost(post._id,post.data.author,index)}};
    }
  }
  
  MenuPortal(PostDropdown,props);
  }  
  
  handleDeletePost(id,author,index){
    //console.log(arguments);
    if(this.props.username){
      if(author === this.props.username){
      return this.props.deletePost(id,index);
      }
    }
  }
  
  handleVotePost(post, i){
   if(this.props.username){
      let voted = post.voted ? true : false;
      console.log('voted or nat');
      console.log(voted);
      this.props.votePost(i, post._id, post.data.subport, voted);
    }
  }

  
  handleNewPosts(page='0'){
    this.props.fetchPosts(page);
  }
  
  scrollListener(){
    var bot = document.body.scrollHeight - window.innerHeight *2;
    var list = function list(e){
      if(document.body.scrollTop > bot){
        console.log('it iz lol,scrolly');
        window.removeEventListener('scroll', throttle);
        this.handleNewPosts();
        return;
      }
      console.log('scrolls fine brop')
    }.bind(this);
    var throttle = scrollThrottle(list, 1000,{trailing: true});

    return throttle;
    //window.addEventListener('scroll', throttle);
  }
  componentWillMount(){
    if(this.props.posts < 10)
    this.props.fetchPosts();
  }
  componentDidMount(){
    window.addEventListener('scroll',this.scrollListener());
  }
  componentDidUpdate(prevProps,n){
    console.log('prevprops');
    console.log(prevProps);
    console.log('nextting');
    console.log(n);
    if(prevProps.posts.length !== this.props.posts.length){
    //console.log('PostsView didupdate add scrollListener');
    window.addEventListener('scroll',this.scrollListener());
    return;
    }
  }
  componentWillUnmount() {
     window.removeEventListener('scroll',this.scrollListener());
  }

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
                                onMenuClick={(event) => this.handleMenu(event,post,i)}
                            />
                        )}
                    </div>
                </main>
            );
  }
}


PostsView.propTypes = {
  posts: PropTypes.array.isRequired,
  username: PropTypes.string
};

export default PostsView;