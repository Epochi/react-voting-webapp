import React, {PropTypes} from 'react';
import Button from 'components/utils/Button';
import classNames from 'classnames/bind';
import styles from 'scss/components/_modal';
const cx = classNames.bind(styles);


export const ShareModal = () => {
    
    return (
        <div>
            Modal
        </div>
        )
}

export const AreYouSure = ({closeParent,closeNow,callback,text}) => {
    //console.log(callback);
    let yes = closeParent ? ()=>{callback(), closeNow(),closeParent()} : ()=>{if(callback() === true){closeNow()}};
    let no =  closeParent ? ()=>{closeNow(),closeParent()} : closeNow;
    
        return (
        <div>
            <div  className={cx('modal-single-header')}>{text}</div>
            <div  className={cx("modal-actions")}>
                <Button onTouchTap={no} label="Atšaukti"/>
                <Button onTouchTap={yes} classes="colored raised" label="Ištrinti"/>
            </div>  
        </div>
        )
}
AreYouSure.propTypes = {
    closeNow: PropTypes.func,
    closeParent: PropTypes.func,
    deleteAction: PropTypes.func,
    text: PropTypes.string
}

export const DeletePost = (props) => {
    return (
        <AreYouSure text="Ar tikrai norite ištrinti šį straipsnį?" {...props} />
        )
}



