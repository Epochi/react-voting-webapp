import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import VoteButton from 'components/utils/VoteButton';
import {Link} from 'react-router';
import styles from 'scss/components/_post';
import {commentDepth, dateCompare} from 'components/utils.jsx';

const cx = classNames.bind(styles);


const Comment = ({comment,username, key, reply, handleReply}) => {
if(comment.depth > 1){  
var spanners = commentDepth(comment.depth,comment.path)
}else {
var spanners = null;
}
let date = dateCompare(comment.date);

 return(
      <div className={cx("comment")}>
        {spanners}
        <div className={cx("comment__body")}>
          <div className={cx("comment__author")}>
            <span><Link to={`/user/${comment.author}`}>{comment.author} </Link></span>
            <span><i className={"material-icons"}>access_time</i> {date}</span>
          </div>
          <div className={cx("comment__bodytext")}>
          {comment.data.bodyText}
          </div>
          <div className={cx("comment__buttonNav")}>
                {username != null ? (
                <div>
                  <a onClick={handleReply}>
                    <span>Atsakyti</span>
                  </a>
                </div>
                  ) : (null)
                }
              <div>
                 <VoteButton handleVote={()=>{ return true}} votes={{}} authenticated={false} type="vote" >
                    <i className={"material-icons"}>arrow_upward</i>
                    <span>{comment.vote_up}</span>
                  </VoteButton>
                </div>
                <div>
                  <VoteButton handleVote={()=>{ return true}} votes={{}} authenticated={false} type="save" >
                    <i data-tooltip="Išsaugoti" className={"material-icons"}>favorite</i>
                  </VoteButton>
                </div>
                <div>
                  <a className={cx('tooltip')}>
                    <i className={"material-icons"}>share</i>
                  </a>
                </div>
                <div>
                  <a className={cx("more-icon","tooltip")}>       
             <i className={"material-icons"}>more_horiz</i>
                  </a>
                </div>
          </div>
          {reply}
          
        </div>
      </div>
        );
 
};

/*
Comment.propTypes = {
  handleVote: PropTypes.func,
  votes: PropTypes.object,
  type:PropTypes.string
};
*/

export default Comment;

