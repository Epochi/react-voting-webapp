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
            onTouchTap={onButtonClick}
            />
            <div onMouseDown={onMouseDown} className={cx("menu__container")}>
            {open ? (
                <ul className={cx("menu")}>
                   {menuItems.map(item => 
                <li   onClick={onRequestClose} key={item.text} className={cx('menu__item', { "menu__item--full-bleed-divider": item.divider })}><Link  {...item} to={item.link}>{item.text}</Link></li>
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




