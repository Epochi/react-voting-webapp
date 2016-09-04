import React, { PropTypes } from 'react';
import Button from 'components/utils/Button'
//import PostButton from 
import {Link} from 'react-router';
import classNames from 'classnames/bind';
import styles from 'scss/components/_post';
import card from 'material-design-lite/src/card/_card';
import {dateCompare} from 'components/utils.jsx';
const cx = classNames.bind(Object.assign(card, styles));

const PostOpen = ({post, handleVote,onMenuClick}) => {
  let hide = post.data.hasOwnProperty('hidden') ? 'n': post.data.hidden;
  let voteClass = false;
  let saveClass = false;
  let date = dateCompare(post.date);
    return (
  <div className={cx("mdl-card","post__open")}>
              <div className={cx("mdl-card__title")}>
                  <h2 className={cx("mdl-card__title-text")}>{post.title}</h2>
              </div>
              <div className={cx("supporting-text")}>
                {post.data.bodytext}
              </div>
              <div className={cx('post__buttonNav',"no-ps")}>
                <div>
                  <a onClick={console.log('votebutton')}>
                    <i className={"material-icons"}>arrow_upward</i>
                    <span>{post.vote_up}</span>
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
};


export default PostOpen;
