import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import Button from 'components/utils/Button';
import Modal from 'components/utils/Modal';





class NewPostModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  

    


  render() {
    return (
    <div>    
      <Button icon="add_circle"/>
      {open ? <Modal/> : null}
    </div> 
    );
  }
}
NewPostModal.propTypes = {
   
};

export default NewPostModal;