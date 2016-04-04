import React from 'react';
import {Link} from 'react-router';
import Button from 'components/utils/Button';
import classNames from 'classnames/bind';
import styles from 'scss/components/_modalApp';
const cx = classNames.bind(styles);

const Modal = React.createClass({
  
  render() {
    return (
      <div>
        <Link to={this.props.returnTo}><div className={cx("modal-backdrop")}></div></Link>
          <div className={cx("modal-window")}>
          <p><Link to={this.props.returnTo}>BOBZ</Link></p>
            {this.props.children}
         </div>
      </div>
    )
  }
})

export default Modal;