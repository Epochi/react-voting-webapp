import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import Button from 'components/utils/Button';
import classNames from 'classnames/bind';
import styles from 'material-design-lite/src/menu/_menu';
import stylesCustom from 'scss/components/_dropdownmenu';
import {Menu} from 'components/utils/Dropdown';
import { Link } from 'react-router';
const cx = classNames.bind(Object.assign(styles,stylesCustom));


export default class PostDropdown extends Component {
    constructor(props) {
    super(props);
    this.state = {open:false};
  }
    
    
    
    render(){
        return(
            <div>worki worki</div>
            );
    }
    
}


export const PostMenu = ({style,username,closeNow,clickWaitClose}) => {
    
    return(
         <Menu style={style}>
            <SharePost closeNow={closeNow} />
            <Link>Blokuoti</Link>
            <Link to="/dashboard">Reportuoti</Link>
         </Menu>
        );
};

const SharePost = ({closeNow}) => {
    
    return(
        <div onClick={closeNow}>
            Dalintis
        </div>
        )
}