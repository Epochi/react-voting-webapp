import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Button from 'components/utils/Button';
import ModalDialog from 'components/utils/Modal';
import { createNewPost } from 'actions/posts';
import { TagReader } from 'components/utils/TagReader.jsx';

class NewPostModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openTab: 0,
      title: "testTitler",
      description: "testContent text very much very interesting ja ja",
      tags: "#tagsrule whatishash #IdontKnow no#spaces #socool",
      funny: false,
      sent: false
    };
  }

  componentWillUpdate = (p,s) => {
    if(this.state.sent === true){
      console.log('this is p');
      console.dir(p);
      console.log('this is s');
      console.dir(s);
       if(this.state.open && !p.isWaiting){
         this.handleRequestClose();
          console.log('chaging it to prev state');
        this.setState({sent:false});
        }
      }
    }


  handleTabClick = (tab) => {
      console.log(tab);
      console.log(tab.id)
      this.setState({
          openTab: tab.id
      });
  }
  handleClick = () => {
      this.state.open ? (document.body.removeAttribute("style") ,this.setState({open: false}) ):(document.body.style.overflow="hidden" , this.setState({open: true}));
  }
  handleRequestClose = () => {
      document.body.removeAttribute("style");
      this.setState({open: false});
  }
  
  
  /*
  type 0 Text post
  type 1 Link post
  type 2 Photo Link post
  funny boolean
  */
  
  handleSend = () => {
      let tagsRed = TagReader(this.state.tags);
      let content = {type: this.state.openTab, title: this.state.title, text: this.state.description, tags: tagsRed, funny: this.state.funny};
      this.props.dispatch(createNewPost(content))
      this.setState({sent: true});
  }
  
  handleInputs = (event) => {
    let stateTarget = event.currentTarget.name;
    console.dir(event.currentTarget.name);
    console.dir( event.target.value);
    console.log(stateTarget);
    this.setState({[event.currentTarget.name]: event.target.value});
  }
  handleCheckbox = () => {
     this.setState({funny: this.state.funny ? false : true});
  }
  
  render() {
      let actions = [
          {label: "Išeiti",id: 0, click: this.handleRequestClose},
          {label: "Siųsti",id: 1, style: "colored raised", click: this.handleSend}
          ]
     let tabs = [
         {id:0, label: "Teksto įrašas"},
         {id:1, label: "Nuoroda"},
         {id:2, label: "Nuotrauka/Gif"}
         ]
    return (
    <div>    
      <Button onClick={this.handleClick} icon={"add_circle"}/>
      {this.state.open ? 
       
        <ModalDialog
            handleTabClick={this.handleTabClick}
            onRequestClose={this.handleRequestClose}
            handleSend={this.handleSend}
            actions={actions}
            tabs={tabs}
            >
        {this.state.openTab === 0 ? 
          <div>
            <div>Pavadinimas</div>
            <input name="title" type="text" value={this.state.title} onChange={this.handleInputs} />
            <div>Tekstas</div>
            <textarea name="description" type="text" value={this.state.description} onChange={this.handleInputs} />
            <div>Tagai</div>
            <input name="tags" type="text" value={this.state.tags} onChange={this.handleInputs} />
            <div>
            <input type="checkbox" checked={this.state.funny} onChange={this.handleCheckbox}/>
            <span>Juokingas?</span>
            </div>
           </div> 
        : null}
            
         {this.state.openTab === 1 ? 
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
   handleNewPost: PropTypes.func,
   isWaiting: PropTypes.bool
};
const mapStateToProps = (state) => {
  return {
    isWaiting: state.ui.isWaiting
  };
};

const NewPost = connect(mapStateToProps)(NewPostModal);

export default NewPost;