import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import Button from 'components/utils/Button';
import classNames from 'classnames/bind';
import styles from 'material-design-lite/src/menu/_menu';
import stylesCustom from 'scss/components/_dropdownmenu';
import {Menu} from 'components/utils/Dropdown';
import {ModalPortal} from 'components/utils/Portal';
import {DeletePost} from 'components/utils/Modals';
import { Link } from 'react-router';

const cx = classNames.bind(Object.assign(styles,stylesCustom));


const PostDrowdown = ({style,closeNow,post,username,id,author,funcs}) => {
   //let areYouSure = function(){closeNow();ModalPortal(ShareModal)};
    
    if(!username){
        return(
          <Menu style={style}>
            <a>Ieškoti panašių</a>
         </Menu>
        )
    }else if(author){
            
    return(
         <Menu style={style}>
            <a onTouchTap={closeNow}>Redaguoti</a>
            <a onTouchTap={(event)=>{closeNow();ModalPortal(DeletePost,{event:event,callback:funcs.del})}}>Trinti</a>
         </Menu>
        );
    } else {
    return(
         <Menu style={style}>
            <a onTouchTap={closeNow}>Blokuoti</a>
            <a onTouchTap={closeNow}>Reportuoti</a>
         </Menu>
        );
        
    }
};
export default PostDrowdown;

PostDrowdown.propTypes = {
    style: PropTypes.object,
    username: PropTypes.string,
    closeNow: PropTypes.func
}


//registered Block, Report
//yourpost edit,delete