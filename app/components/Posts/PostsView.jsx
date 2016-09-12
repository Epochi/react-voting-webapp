import React, { PropTypes, Component} from 'react';
import classNames from 'classnames/bind';
import styles from 'scss/components/_postsview';
import layout from 'material-design-lite/src/layout/_layout';
import grid from 'material-design-lite/src/grid/_grid';
import Post from 'components/Posts/Post';
import PostOpen from 'components/Posts/PostOpen';
import PostDropdown from 'components/Posts/PostDropdown';
import {MenuPortal} from 'components/utils/Portal';
import PostListFooter from 'containers/PostListFooter';
import PostListRefresh from 'components/utils/PostListRefresh';
import {scrollThrottle} from 'components/utils.jsx';

const cx = classNames.bind(Object.assign(layout, grid, styles));



class PostsView extends Component {
  constructor(props) {
    super(props);
    this.handleMenu = this.handleMenu.bind(this);
    this.scrollListener = this.scrollListener.bind(this);
    this.handleNewPosts = this.handleNewPosts.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
    this.handlePostOpen = this.handlePostOpen.bind(this);
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

  handleVote = (post,i,vote) =>{
    //LINK TO LOGIN IF NOT LOGGED IN
    console.log('handleVote')
    console.log(vote);
    console.log(post);
    console.log(i);
    console.log('handleVote END')
   if(this.props.username){
      console.log('voted or nat');
       this.props.vote({subport: this.props.selectedPort, index: i,type: vote,post: post});
    } else{
       console.log('link to login or register');
    }
  }

  handlePostOpen = (index) =>{
    this.props.setPostOpenIndex({[this.props.selectedPort]: index})
  }
  
  handleNewPosts(subport=this.props.selectedPort, page=this.props.posts.pages[this.props.selectedPort]){
    this.props.fetchPosts({subport: subport}, {page:page});
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
    if(this.props.posts[this.props.selectedPort] < 10)
    this.handleNewPosts(this.props.selectedPort);
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
    if(prevProps.posts[this.props.selectedPort].length !== this.props.posts[this.props.selectedPort].length){
    console.log('PostsView didupdate add scrollListener');
    this.postList.addEventListener('scroll',this.scrollListener());
    return;
    } 
  }
  componentWillUnmount() {
     this.postList.removeEventListener('scroll',this.scrollListener());
  }

  render () {
        const split = this.props.routeParams.hasOwnProperty("postId") ? "split-on":false;
        const auth = this.props.authenticated ? "loggedin":false
        const {posts, postOpenIndex, selectedPort} = this.props;
        const postOpen = this.props.routeParams.hasOwnProperty('postId') ? posts[selectedPort][postOpenIndex[selectedPort]]: null;
                return (
                <main className={cx('mdl-layout__content',"main-view",auth)}>
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
                            {!posts.hasOwnProperty([selectedPort]) || posts[selectedPort].length === 0 ?
                            (
                            <PostListRefresh postListRefresh={() => this.handleNewPosts()} postsError="Kažkas netaip =/" />
                            )
                            :
                            (posts[selectedPort].map((post, i) =>
                                <Post
                                  key={i}
                                  k={i}
                                  post={post}
                                  currentSubport={selectedPort}
                                  handlePostOpen={() => this.handlePostOpen(i)}
                                  onMenuClick={(event) => this.handleMenu(event,post,i)}
                                  handleVote={this.handleVote}
                                  votes={post.votes ? post.votes : {}}
                                  authenticated={this.props.authenticated}
                              />
                          ))}
                          <PostListFooter postListRefresh={() => this.handleNewPosts()} />
                      </div>
                    </div>
                    {this.props.routeParams.hasOwnProperty('postId') ? (
                      <PostOpen
                                  post={postOpen}
                                  currentSubport={selectedPort}
                                  onMenuClick={(event) => this.handleMenu(event,postOpen,postOpenIndex.selectedPort)}
                                  handleVote={this.handleVote}
                                  votes={postOpen.votes ? postOpen.votes : {}}
                                  authenticated={this.props.authenticated}
                              />
                      ) : (null)
                    }
                  </div>  
                </main>
                
            );
  }
}


PostsView.propTypes = {
  posts: PropTypes.object,
  username: PropTypes.string,
  selectedPort: PropTypes.string,
  uiSort: PropTypes.string,
  authenticated: PropTypes.bool
};

export default PostsView;