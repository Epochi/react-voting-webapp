import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import Button from 'components/utils/Button';
import ModalDialog from 'components/utils/ModalDialog';

class NewPostModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openTab: "text",
      valueTitle: "",
      valueText: ""
    };
  }
  
  handleTabClick =(tab) => {
      console.log(tab);
      console.log(tab.id)
      this.setState({
          openTab: tab.id
      });
  }
  handleTabChange = () => {
      
  }
  handleClick = () => {
      this.state.open ? (document.body.removeAttribute("style") ,this.setState({open: false}) ):(document.body.style.overflow="hidden" , this.setState({open: true}));
  }
  handleRequestClose = () => {
      document.body.removeAttribute("style");
      this.setState({open: false});
  }
  handleSend = () => {
      let content = {title: this.state.valueTitle, text: this.state.valueText};
      this.props.handleNewPost(this.state.openTab, content);
  }
  
  handleTitleChange = (event) => {
    this.setState({valueTitle: event.target.value});
  }
  handleTextChange  = (event) => {
    this.setState({valueText: event.target.value});
  }
  
  render() {
      let actions = [
          {label: "Išeiti",id: 1, click: this.handleRequestClose},
          {label: "Siųsti",id: 2, style: "colored raised", click: this.handleSend}
          ]
     let tabs = [
         {id:"text", label: "Teksto įrašas"},
         {id:"link", label: "Nuoroda"},
         {id:"photo", label: "Nuotrauka/Gif"}
         ]
    return (
    <div>    
      <Button onClick={this.handleClick} icon={"add_circle"}/>
      {this.state.open ? 
       
        <ModalDialog
            handleTabClick={this.handleTabClick}
            onRequestClose={this.handleRequestClose}
            actions={actions}
            tabs={tabs}
            >
        {this.state.openTab === "text" ? 
          <div>
            <div>Pavadinimas</div>
            <input name="title" type="text" value={this.state.valueTitle} onChange={this.handleTitleChange} />
            <div>Tekstas</div>
            <textarea name="description" type="text" value={this.state.valueText} onChange={this.handleTextChange} />
           </div> 
        : null}
            
         {this.state.openTab === "link" ? 
            <div>
                pls link
            </div>
         : null}
        </ModalDialog>
        
      : null}
    </div> 
    );
  }
}

NewPostModal.propTypes = {
   children: PropTypes.node,
   handleNewPost: PropTypes.func
};


export default NewPostModal;