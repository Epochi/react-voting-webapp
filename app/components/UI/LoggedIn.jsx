import React, { PropTypes } from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import Button from 'components/utils/Button';
import Dropdown from 'components/utils/Dropdown';
import NewPostModal from 'components/Posts/NewPostModal';
import classNames from 'classnames/bind';
import styles from 'scss/components/_inline-block';
const cx = classNames.bind(styles);

class UserDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      handleLogOut: props.handleLogOut,
      mouseDownListener: false
    };
  }
  
  
  componentDidUpdate = (prevProps, prevState) => {
    if(!prevState.open){
        console.log("Component Did Mount");  
    window.addEventListener('mousedown', this.outsideClick, false);
    }
  };
  
  outsideClick =  (e) => {
    console.log("outsideClick: " + !this.state.mouseDownListener);
      if (this.state.mouseDownListener) {
          this.setState({
          mouseDownListener: true
        });
        return;
      }

      
     window.removeEventListener('mousedown', this.outsideClick, false);
      this.setState({
          open: false
      });
  };
    
    handleMouseDown = () => {
        this.setState({
          mouseDownListener: true
        });
    };
    

  
  handleTouchTap = (event) => {
    this.state.open ? this.setState({open: false}) : this.setState({open: true});
  };
  handleRequestClose = () => {
    window.removeEventListener('mousedown', this.outsideClick, false);
    this.setState({
      open: false,
      mouseDownListener: false
    });
    
    
  };

  render() {
    const menuItems = [
      {text: "Mano Paskyra", link:"/dashboard" },
      {text: "Pagalba",link:"/help" , divider: true},
      {text: "Postai", link:"/user/posts" },
      {text: "Komentarai", link:"/user/comments" ,divider: true},
      {text: "Nustatymai", link:"/user/settings" },
      {text: "Atsijungti", onClick: () => {this.props.handleLogOut()}, link:"/" }
      ]
    return (
      <Dropdown
        open={this.state.open}
        icon="more_vert"
        menuItems={menuItems}
        onButtonClick={this.handleTouchTap}
        onRequestClose={this.handleRequestClose}
        onMouseDown={this.handleMouseDown}
      />
    );
  }
}
UserDropdown.propTypes = {
   handleLogOut: PropTypes.func
};



const UserUI = ({username, handleLogOut}) => {
  return <div className={cx("inline-wrapper")}><Button label={username}/><UserDropdown handleLogOut={handleLogOut}/><NewPostModal/></div>
};

UserUI.propTypes = {
  username: PropTypes.string,
  handleLogOut: PropTypes.func,
};

export default UserUI;




