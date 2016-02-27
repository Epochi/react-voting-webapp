import React, { PropTypes } from 'react';
import Button from 'components/utils/Button';
import classNames from 'classnames/bind';
import styles from 'scss/components/_modal';
const cx = classNames.bind(styles);


const Modal = ({open}) => {

    return (
        <div>
            <div className={cx("modal-backdrop")}>
            </div>
            <div className={cx("modal-window")}>
            </div>
        </div>
        );
    
};
    
Modal.propTypes = {
  open: PropTypes.bool
};

export default Modal;




