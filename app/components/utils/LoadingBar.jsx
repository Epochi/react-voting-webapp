import React from 'react';
import classNames from 'classnames/bind';
import styles from 'material-design-lite/src/progress/_progress';
const cx = classNames.bind(styles);




const LoadingBar = () => {
    return(
        <div className={cx("mdl-progress","mdl-progress__indeterminate","is-upgraded")}>
            <div className={cx("progressbar", "bar","bar1")}></div>
            <div className={cx("bufferbar","bar","bar2")} ></div>
            <div className={cx("auxbar","bar","bar3")}></div>
        </div>
    );
};
    
export default LoadingBar;
