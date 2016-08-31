import React, { PropTypes, Component} from 'react';
import classNames from 'classnames/bind';
import styles from 'scss/components/_post';
import card from 'material-design-lite/src/card/_card';
import layout from 'material-design-lite/src/layout/_layout';
import grid from 'material-design-lite/src/grid/_grid';
import PostDropdown from 'components/Posts/PostDropdown';



const cx = classNames.bind(Object.assign(card, styles));


class PostOpen extends Component {
  /*constructor(props) {
    super(props);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
  }
  */
  //don't update if username changes
  shouldComponentUpdate(nextProps,nextState){
    console.log(arguments);
      if(this.props.username !== nextProps.username){return false}
    return true;
  }
  
  
 /* handleMenu (e,post,index){
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
  
  }*/
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

  render () {
        const {post} = this.props.post;
            return (
  <div className={cx("mdl-card","post")}>
              <div className={cx("mdl-card__title")}>
                  <h2 className={cx("mdl-card__title-text")}>{post.title}</h2>
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
                  <a onClick={console.log('votebutton')}>
                    <i className={"material-icons"}>arrow_upward</i>
                    <span>{post.voteup}</span>
                    <span className={cx('tooltip-text')}>Balsuoti</span>
                  </a>
                </div>
                <div>
                  <a onClick={console.log('votebutton')}>
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
                  <a onClick={console.log('votebutton')}>
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
  username: PropTypes.string,
  post: PropTypes.object,
  comments: PropTypes.object
};

export default PostOpen;
