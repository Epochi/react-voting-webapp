import React, { PropTypes } from 'react';
import Button from 'components/utils/Button'
import classNames from 'classnames/bind';
import styles from 'scss/components/_post';
import card from 'material-design-lite/src/card/_card';
const cx = classNames.bind(Object.assign(styles, card));

const Post = ({title,bodytext,permalink,score}) => {
  let voted = cx({
    "vote__button": true
  });
  
    return(
             <div className={cx("mdl-card","post")}>
              <div className={cx("mdl-card__title")}>
                <a className={voted}><i className={"material-icons"}>arrow_drop_up</i><span>{score}</span></a>
                <h2 className={cx("mdl-card__title-text")}>{title}</h2>
              </div>
              <div className={cx("mdl-card__supporting-text")}>
                {bodytext}
              </div>
              <div className={cx("mdl-card__actions","mdl-card--border")}>
                <a className={cx("mdl-button","mdl-button--colored","mdl-js-button","mdl-js-ripple-effect")}>
                  Buttons go here
                </a>
              </div>
            </div>       
        )
    
}

Post.PropTypes ={
    title: PropTypes.string.isRequired,
    bodytext: PropTypes.string.isRequired,
    permalink: PropTypes.string
}

export default Post; 

    
