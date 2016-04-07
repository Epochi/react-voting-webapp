import React from 'react';
import classNames from 'classnames/bind';
import styles from 'material-design-lite/src/spinner/_spinner';
const cx = classNames.bind(styles);




const Spinner= () => {
    
    return(
         <div className={cx("mdl-spinner","is-upgraded","mdl-spinner--single-color","is-active")}>
                 <div className={cx("mdl-spinner__layer","mdl-spinner__layer-1")}>
                    <div className={cx("mdl-spinner__circle-clipper","mdl-spinner__left")}>
                        <div className={cx("mdl-spinner__circle")}></div>
                    </div>
                    <div className={cx("mdl-spinner__gap-patch")}>
                        <div className={cx("mdl-spinner__circle")}></div>
                    </div>
                    <div className={cx("mdl-spinner__circle-clipper","mdl-spinner__right")}>
                        <div className={cx("mdl-spinner__circle")}></div>
                    </div>
                </div>
                <div className={cx("mdl-spinner__layer","mdl-spinner__layer-2")}>
                    <div className={cx("mdl-spinner__circle-clipper","mdl-spinner__left")}>
                        <div className={cx("mdl-spinner__circle")}></div>
                    </div>
                    <div className={cx("mdl-spinner__gap-patch")}>
                        <div className={cx("mdl-spinner__circle")}></div>
                    </div>
                    <div className={cx("mdl-spinner__circle-clipper","mdl-spinner__right")}>
                        <div className={cx("mdl-spinner__circle")}></div>
                    </div>
                </div>
                <div className={cx("mdl-spinner__layer","mdl-spinner__layer-3")}>
                    <div className={cx("mdl-spinner__circle-clipper","mdl-spinner__left")}>
                        <div className={cx("mdl-spinner__circle")}></div>
                    </div>
                    <div className={cx("mdl-spinner__gap-patch")}>
                        <div className={cx("mdl-spinner__circle")}></div>
                    </div>
                    <div className={cx("mdl-spinner__circle-clipper","mdl-spinner__right")}>
                        <div className={cx("mdl-spinner__circle")}></div>
                    </div>
                </div>
                <div className={cx("mdl-spinner__layer","mdl-spinner__layer-4")}>
                    <div className={cx("mdl-spinner__circle-clipper","mdl-spinner__left")}>
                        <div className={cx("mdl-spinner__circle")}></div>
                    </div>
                    <div className={cx("mdl-spinner__gap-patch")}>
                        <div className={cx("mdl-spinner__circle")}></div>
                    </div>
                    <div className={cx("mdl-spinner__circle-clipper","mdl-spinner__right")}>
                        <div className={cx("mdl-spinner__circle")}></div>
                    </div>
                </div>
            </div>
    );
};
    
export default Spinner;
