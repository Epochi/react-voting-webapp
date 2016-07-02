import React, { PropTypes, Component} from 'react';
import classNames from 'classnames/bind';
import {Link} from 'react-router';
import styles from 'scss/components/_post';
import card from 'material-design-lite/src/card/_card';
import layout from 'material-design-lite/src/layout/_layout';
import grid from 'material-design-lite/src/grid/_grid';
import Post from 'components/Posts/Post';
import PostDropdown from 'components/Posts/PostDropdown';
import {MenuPortal} from 'components/utils/Portal';
import {scrollThrottle} from 'components/utils.jsx';


const cx = classNames.bind(Object.assign(card, styles));


class PostOpen extends Component {
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

  }
  componentDidMount(){
 
  }
  componentDidUpdate(prevProps,n){

  }
  componentWillUnmount() {

  }

  render () {
        const post = this.props.post
            return (
  <div className={cx("mdl-card","post")}>
              <div className={cx("mdl-card__title")}>
                <Link to={{pathname: `/${post.subport}/${post.post_id}`, state : {index: k}}}>
                  <h2 className={cx("mdl-card__title-text")}>{post.title}</h2>
                </Link>
              </div>
              <div className={cx("mdl-card__supporting-text")}>
                {post.data.bodytext}
              </div>
              <div className={cx('post__buttonNav',"no-ps")}>
                 <div>
                  <a className={cx('tooltip')}>
                    <i className={"material-icons"}>expand_more</i>
                    <span>Išplėsti</span>
                    <span className={cx('tooltip-text')}>Išplėsti</span>
                  </a>
                </div>
                <div>
                  <a onClick={()=>{handleVote(k,{id:post.post_id, state: post.post_vote ? 1 : 0, data: post.post_vote >= 20 ? post.post_vote - 10 : post.post_vote + 10})}} className={voteClass}>
                    <i className={"material-icons"}>arrow_upward</i>
                    <span>{post.voteup}</span>
                    <span className={cx('tooltip-text')}>Balsuoti</span>
                  </a>
                </div>
                <div>
                  <a onClick={()=>{handleVote(k,{id:post.post_id, state: post.post_vote ? 1 : 0, data: post.post_vote % 2 ? post.post_vote - 1 : post.post_vote + 1})}} className={saveClass}>
                    <i className={"material-icons"}>favorite</i>
                    <span className={cx('tooltip-text')}>Išsaugoti</span>
                  </a>
                </div>
                <div>
                  <a className={cx('tooltip')}>
                    <i className={"material-icons"}>share</i>
                    <span className={cx('tooltip-text')}>Dalintis</span>
                  </a>
                </div>
                <div>
                  <a onClick={onMenuClick} className={cx("more-icon","tooltip")}>
                    <i className={"material-icons"}>more_horiz</i>
                    <span className={cx('tooltip-text')}>Daugiau</span>
                  </a>
                </div>
                  
              </div>
              <div className={cx("mdl-card__actions","mdl-card--border")}>
                <div className={cx("post__author", "no-p")}>
                  <a>
                    {post.author}
                  </a>
                  <br/>
                    <span><i className={"material-icons"}>access_time</i> {}</span>
                </div>
              </div>
              <div className={cx("mdl-card__actions","mdl-card--border")}>
                <a className={cx("mdl-button","mdl-button--colored","mdl-js-button","mdl-js-ripple-effect")}>
                  Comments go here
                </a>
              </div>
            </div>       
        );
   }
}


PostOpen.propTypes = {
  selectedPort: PropTypes.string,
  username: PropTypes.string,
  post: PropTypes.object,
  comments: PropTypes.object
};

export default PostOpen;