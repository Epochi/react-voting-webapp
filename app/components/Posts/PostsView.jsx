import React, { PropTypes, Component} from 'react';
import classNames from 'classnames/bind';
import styles from 'scss/components/_postsview';
import layout from 'material-design-lite/src/layout/_layout';
import grid from 'material-design-lite/src/grid/_grid';
import Post from 'components/Posts/Post';
import PostDropdown from 'components/Posts/PostDropdown';
import {MenuPortal} from 'components/utils/Portal';
import {scrollThrottle} from 'components/utils.jsx';

const cx = classNames.bind(Object.assign(layout, grid, styles));



class PostsView extends Component {
  constructor(props) {
    super(props);
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
  
  
  handleMenu (e,post,index){
  var props = {event:e};
  if(this.props.username){
    props.id = post._id;
    props.username = this.props.username;
    if(this.props.username === post.data.author){
      props.author = post.data.author;
      props.funcs = {del: (cb)=>{this.handleDeletePost(post._id,post.data.author,index,cb)}};
    }
  }
  
  MenuPortal(PostDropdown,props);
  }  
  
  handleDeletePost(id,author,index,cb){
    //console.log(arguments);
    if(this.props.username){
      if(author === this.props.username){
       this.props.deletePost(id,index,cb);
      }
    }
  }

  handleVote = (i,p) => {
    //LINK TO LOGIN IF NOT LOGGED IN
    console.log('handleVote')
    console.log(i);
    console.log(p);
    //console.log(this);
    //console.log(arguments);
    console.log('handleVote END')
   if(this.props.username){
      console.log('voted or nat');
      this.props.vote({index: i, vote: p});
    }
  }

  
  handleNewPosts(page='0'){
    this.props.fetchPosts({page});
  }
  
  handleScroll(){
    console.log(this)
  }
  
  scrollListener(){
    var bot = this.postList.scrollHeight - window.innerHeight *2;
    var list = function list(e){
      if(this.postList.scrollTop > bot){
        console.log('it iz lol,scrolly');
        this.postList.removeEventListener('scroll', throttle);
        this.handleNewPosts();
        return;
      }
      console.log('scrolls fine brop');
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
    console.log('Postlist');
    console.log(this.postList);
    this.postList.addEventListener('scroll',this.scrollListener());
  }
  componentDidUpdate(prevProps,n){
    console.log('prevprops');
    console.log(prevProps);
    console.log('nextting');
    console.log(n);
    if(prevProps.posts.length !== this.props.posts.length){
    console.log('PostsView didupdate add scrollListener');
    this.postList.addEventListener('scroll',this.scrollListener());
    return;
    }
  }
  componentWillUnmount() {
     this.postList.removeEventListener('scroll',this.scrollListener());
  }

  render () {
        const split = this.props.children ? "split-on":false;
         const {posts} = this.props;
                return (
                <main className={cx('mdl-layout__content',"main-view")}>
                  <div className={cx("page-split-wrapper",split)}>
                    <div ref={(ref) => this.postList = ref} id="post-list" className={cx('page-post-list')}>
                          <div className={cx("main-sidebar","left")}>
                          Hot, Top, New
                          <br/>
                          #naujienos
                          <br/>
                          #juokuciai
                        </div>
                        <div className={cx("main-sidebar","right")}>
                                              Hot, Top, New
                          <br/>
                          #naujienos
                          <br/>
                          #juokuciai
                      </div>
                    
                      <div className={cx('mdl-grid','main-grid')}>
                            {posts.map((post, i) =>
                                <Post
                                  key={i}
                                  k={i}
                                  post={post}
                                  handleVote={this.handleVote}
                                  onMenuClick={(event) => this.handleMenu(event,post,i)}
                              />
                          )}
                      </div>
                    </div>
                    {this.props.children ? (
                    <div className={cx('page-post')}>
                       {this.props.children}
                     </div>
                      ) : (null)
                    }
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