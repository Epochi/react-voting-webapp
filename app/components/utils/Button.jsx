import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'material-design-lite/src/button/_button';
const cx = classNames.bind(styles);


const Button = ({onTouchTap, onClick, children, label, classes, icon }) => {
let css = ['mdl-button'];
let iconButton = icon ?(classes=['icon'] ,iconButton = <i className={cx("material-icons") + " material-icons"}>{icon}</i>): null;

if(Array.isArray(classes)){
    classes.map(function(customClass){
      let cc = 'mdl-button--' + customClass;
      css.push(cc);
    });
}
let className = cx(css);

return(
  <button onTouchTap={onTouchTap} onClick={onClick} className={className}>
    {iconButton}{label}{children}
  </button>
    );
};
Button.propTypes = {
  onTouchTap: PropTypes.func,
  onClick: PropTypes.func,
  children: PropTypes.node,
  classes: PropTypes.array,
  label: PropTypes.string,
  icon: PropTypes.string
};

export default Button;