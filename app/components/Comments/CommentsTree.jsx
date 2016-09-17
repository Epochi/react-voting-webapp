import React, { PropTypes, Component} from 'react';
import classNames from 'classnames/bind';
import styles from 'scss/components/_comments-tree';
import layout from 'material-design-lite/src/layout/_layout';
import grid from 'material-design-lite/src/grid/_grid';
import Comment from 'components/Comments/Comment';
import {MenuPortal} from 'components/utils/Portal';
import PostDropdown from 'components/Posts/PostDropdown';

const cx = classNames.bind(Object.assign(layout, grid, styles));



class CommentsTree extends Component {
  constructor(props) {
    super(props);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleReply = this.handleReply.bind(this);
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
  
  handleReply(commentId){
    
  }
  
    shouldComponentUpdate(nextProps,nextState){
    console.log(arguments);
      if(this.props.username !== nextProps.username){return false}
    return true;
  }
  
componentWillMount(){
    if(this.props.commentPostId !== this.props.routeParamsPostId)
    this.props.fetchPostComments(this.props.routeParamsPostId);
  }
  

  render () {
                return (
                    <div className={cx('comments-tree__layout')}>
                        {this.props.comments ? (
                            <Comment
                              comment={this.props.comments}
                              handleReply={this.handleReply}
                              //childComments={this.props.comments.childComments}
                              />
                        ) 
                            : (null)
                        }
                    </div>


            );
  }
}


CommentsTree.propTypes = {
  username: PropTypes.string,
  comments: PropTypes.object,
  sort: PropTypes.string,
  commentPostId: PropTypes.string,
  routeParamsPostId: PropTypes.string
};

export default CommentsTree;