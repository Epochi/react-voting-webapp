import React, { PropTypes } from 'react';
import Button from 'components/utils/Button'
import classNames from 'classnames/bind';
import styles from 'scss/components/_post';
import card from 'material-design-lite/src/card/_card';
const cx = classNames.bind(Object.assign(styles, card));

const Post = ({post, onClick, liked=false}) => {
  let voted = cx({
    "vote__button": true,
    "liked": liked
  });
  let likedspan = cx({
    "hiddenspan": true,
    "likedspan": liked
  });
  
    return(
             <div className={cx("mdl-card","post")}>
              <div className={cx("mdl-card__title")}>
                <a onClick={onClick} className={voted}><i className={"material-icons"}>arrow_drop_up</i><span>{post.score}</span><span className={likedspan}>{post.score+1}</span></a>
                <h2 className={cx("mdl-card__title-text")}>{post.data.title}</h2>
              </div>
              <div className={cx("mdl-card__supporting-text")}>
                {post.data.bodytext}
              </div>
              <div className={cx("mdl-card__actions","mdl-card--border")}>
                <a className={cx("mdl-button","mdl-button--colored","mdl-js-button","mdl-js-ripple-effect")}>
                  Buttons go here
                </a>
              </div>
            </div>       
        );
};

Post.PropTypes ={
    post: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    liked: PropTypes.bool
};

export default Post; 

    
