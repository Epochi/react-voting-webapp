import React, { Component, PropTypes } from 'react';
import UI from 'containers/UI';
import Footer from 'containers/Footer'
import 'scss/main';
import classNames from 'classnames/bind';
import layout from 'material-design-lite/src/layout/_layout';
import customLayout from 'scss/components/_layout';
import Modal from 'components/utils/simpleModal';
//import Modal from 'components/utils/ModalDialog';
const cx = classNames.bind(Object.assign(layout,customLayout));

class App extends Component {
   componentWillReceiveProps(nextProps) {
    if ((
      nextProps.location.key !== this.props.location.key &&
      nextProps.location.state &&
      nextProps.location.state.modal
    )) {
      // save the old children (just like animation)
      this.previousChildren = this.props.children
    }
  }

  
    render() {
    let { location } = this.props
    let isModal = (
      location.state &&
      location.state.modal &&
      this.previousChildren
    )

return (
    <div className={cx("mdl-layout__container")}>
      <div className={cx("mdl-layout","mdl-layout--fixed-header")}>
      <UI location={location}/>
          {isModal ?
            this.previousChildren :
            this.props.children
          }

          {isModal && (
            <Modal isOpen={true} returnTo={location.state.returnTo}>
              {this.props.children}
            </Modal>
          )}
      <Footer />  
      </div>
    </div>  
)
  }
}
App.propTypes = {
  children: PropTypes.object
};

export default App;