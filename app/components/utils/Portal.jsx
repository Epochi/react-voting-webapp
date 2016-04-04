import React, { PropTypes } from 'react';
import {render} from 'react-dom';
import Button from 'components/utils/Button';
import classNames from 'classnames/bind';
import styles from 'material-design-lite/src/menu/_menu';
import stylesCustom from 'scss/components/_dropdownmenu';
import { Link } from 'react-router';
const cx = classNames.bind(Object.assign(styles,stylesCustom));


const Portal = (evt, elm, calee) => {
     var menu = document.getElementById(calee);
     if(menu){
         menu.parentElement.removeChild(menu);
     }
      var menu = document.createElement('div');
      menu.id = calee;
      menu.style.position = "absolute"
      menu.style.zIndex = "2";
      menu.style.top = evt.y+"px";
      menu.style.left = evt.x+"px";
      document.body.appendChild(menu);
          
        
      render(<PortalClass>{elm}</PortalClass>, menu);
}

export default Portal;


const PortalClass = React.createClass({
  render: () => null,
  portalElement: null,
  componentDidMount() {
    var p = this.props.portalId && document.getElementById(this.props.portalId);
    if (!p) {
      var p = document.createElement('div');
      p.id = this.props.portalId;
      document.body.appendChild(p);
    }
    this.portalElement = p;
    this.componentDidUpdate();
  },
  componentWillUnmount() {
    document.body.removeChild(this.portalElement);
  },
  componentDidUpdate() {
    render(<div {...this.props}>{this.props.children}</div>, this.portalElement);
  }
});

