import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'scss/components/_snackbar';
import LoadingBar from 'components/utils/LoadingBar'
import Spinner from 'components/utils/Spinner'
const cx = classNames.bind(styles);

const Snackbar = ({messageOpen, message, isWaiting,postsLoad}) => {
    
    
    return(
        <div>
            {isWaiting ? (
                  <div className={cx("snackbar-wrapper")}>
                    <LoadingBar/>
                </div> 
                ) : (null)
            }
        </div>
        )
    
};

Snackbar.PropTypes = {
    isWaiting: PropTypes.bool
}


export default Snackbar;
