import React, { PropTypes, Component} from 'react';
import Comment from 'components/Comments/Comment';
import {MenuPortal} from 'components/utils/Portal';
import PostDropdown from 'components/Posts/PostDropdown';



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
  
  handleReply = (e,key) => {
    console.log(e.target.username);
    console.log(key);
  }
  
  
    shouldComponentUpdate(nextProps,nextState){
    console.log(arguments);
      if(this.props.username !== nextProps.username){return false}
    return true;
  }
  
componentWillMount(){
    console.log('comments components will mount?');
    if(this.props.commentPostId !== this.props.routeParamsPostId)
    console.log('comments components did fetch');
    this.props.fetchPostComments(this.props.routeParamsPostId);
  }
  

  render () {
                return (
                    <div className={'comment-tree__layout'}>
                        {this.props.comments ?
                        (this.props.comments.map((comment,i) =>
                            <Comment
                              key={i}
                              comment={comment}
                              username={this.props.username}
                              handleReply={this.handleReply}
                              reply={null}
                              />
                        ) )
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