import React, { PropTypes } from 'react';
import Button from 'components/utils/Button';
import classNames from 'classnames/bind';
import styles from 'material-design-lite/src/menu/_menu';
import stylesCustom from 'scss/components/_dropdownmenu';
import { Link } from 'react-router';
const cx = classNames.bind(Object.assign(styles,stylesCustom));



const Dropdown = ({open,label,icon,menuItems,onButtonClick,onRequestClose,onMouseDown}) => {

    return (
        <div>
            <Button
            label={label}
            icon={icon}
            onMouseDown={onMouseDown}
            onTouchTap={onButtonClick}
            />
            <div onMouseDown={onMouseDown} className={cx("menu__container")}>
            {open ? (
                <ul className={cx("menu")}>
                   {menuItems.map(item => 
                    <Link  {...item} to={item.link}>
                        <li   onClick={onRequestClose} key={item.text} className={cx('menu__item', { "menu__item--full-bleed-divider": item.divider })}>
                         {item.text}
                        </li>
                    </Link>    
                    )}
                </ul>
            ) :
            null
            }
            </div>
        </div>
        
        );
    
};
    
Dropdown.propTypes = {
  open: PropTypes.bool,
  label: PropTypes.string,
  icon: PropTypes.string,
  menuItems: PropTypes.array,
  onRequestClose: PropTypes.func,
  onButtonClick: PropTypes.func,
  onBlur: PropTypes.func
};

export default Dropdown;




export const Menu = (props) => {
    console.log('propsys'); 
     props.children.map((item, i) =>
                            console.dir(props.children)
                        )
    console.dir(props.children);
    return (
            <ul style={props.style} className={cx("menu")}>
                       {props.children.map((item, i) =>
                            <li key={i} className={cx('menu__item')}>{item}</li>
                        )}
            </ul>
        )
}