import React, { PropTypes }from 'react';
import Button from 'components/utils/Button';
import classNames from 'classnames/bind';
import styles from 'scss/components/_modal';
import { Link } from 'react-router';
const cx = classNames.bind(styles);


const ModalDialog = ({
    children, actions, onRequestClose, title, tabs, handleTabClick
}) => {
    let titleProp = title ? <h3 className={cx("modal-title")}>{title}</h3> : null;

    return (
        <div>
            <div onClick={onRequestClose} className={cx("modal-backdrop")}>
            </div>
            <div className={cx("modal-window")}>
                <div className={cx("modal-header")}>
                    {titleProp}
                    {tabs ? (
                    tabs.map(tab =>
                        <div onClick={handleTabClick.bind(this, tab)} key={tab.id}>{tab.label}</div>
                        )
                       ) : null }
                    <a onClick={onRequestClose} className={cx("exit-icon")}><i className={'material-icons'}>close</i></a>
                </div>
                <div className={cx("modal-content")}>
                    {children}
                </div>
                <div className={cx("modal-actions")}>
                    {actions ?
                    actions.map(action => 
                        <Button
                        key={action.id}
                        classes={action.style}
                        {...action}
                        onClick={action.click}
                        />
                    ) : null }
                    
                </div>
                
            </div>
        </div>
    );

};

ModalDialog.propTypes = {
    children: PropTypes.node,
    actions: PropTypes.array,
    onRequestClose: PropTypes.func,
    title: PropTypes.string,
    tabs: PropTypes.array,
    handleTabClick: PropTypes.func
};

export default ModalDialog;


export const Modal = ({children,closeNow,zIndex}) => {
 
  
  return (
    <div>
            <div onTouchTap={closeNow} style={{zIndex: zIndex+2}} className={cx("modal-backdrop")}>
            </div>
            <div style={{zIndex: zIndex+3}} className={cx("modal-window")}>
                <a onTouchTap={closeNow} className={cx("exit-icon")}><i className={'material-icons'}>close</i></a>
                {children}
                
            </div>
        </div>
    )
  
}

Modal.propTypes = {
    children: PropTypes.node,
    closeNow: PropTypes.func
};