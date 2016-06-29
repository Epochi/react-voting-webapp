import React, { PropTypes } from 'react';
import Button from 'components/utils/Button'
//import PostButton from 
import classNames from 'classnames/bind';
import styles from 'scss/components/_post';
import card from 'material-design-lite/src/card/_card';
import {dateCompare} from 'components/utils.jsx';
const cx = classNames.bind(Object.assign(styles, card));

const Post = ({post, handleVote,onMenuClick,k}) => {
  let hide = post.data.hidden ? 'n':false;
  let voteClass = cx({
    "vote__button": true,
    "voted":  post.post_vote >= 20 ? true : false,
    "tooltip": true
  });
  let date = dateCompare(post.date);
    return(
             <div className={cx("mdl-card","post",hide)}>
              <div className={cx("mdl-card__title")}>
                <a><h2 className={cx("mdl-card__title-text")}>{post.title}</h2></a>
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
                  <a onClick={()=>{handleVote(k,{id:post.post_id,state: post.post_vote ? 1 : 0,data: post.post_vote >= 20 ? post.post_vote - 10 : post.post_vote + 10})}} className={voteClass}>
                    <i className={"material-icons"}>arrow_upward</i>
                    <span>{post.score}</span>
                    <span className={cx('tooltip-text')}>Balsuoti</span>
                  </a>
                </div>
                <div>
                  <a onClick={()=>{handleVote(k,{id:post.post_id,state: post.post_vote ? 1 : 0,vote: post.post_vote % 2 ? post.post_vote + 1 : post.post_vote - 1})}} className={cx('tooltip',post.post_vote % 2 ? false:true)}>
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
                    <span><i className={"material-icons"}>access_time</i> {date}</span>
                </div>
              </div>
              <div className={cx("mdl-card__actions","mdl-card--border")}>
                <a className={cx("mdl-button","mdl-button--colored","mdl-js-button","mdl-js-ripple-effect")}>
                  Comments go here
                </a>
              </div>
            </div>       
        );
};

Post.PropTypes ={
    post: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    onMenuClick: PropTypes.func
};

export default Post; 


    
//<a onClick={onClick} className={vote}><i className={"material-icons"}>arrow_drop_up</i><span>{post.score}</span></a>