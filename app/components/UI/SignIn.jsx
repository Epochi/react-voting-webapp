import React, { PropTypes } from 'react';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import IconButton from 'material-ui/lib/icon-button';
import Divider from 'material-ui/lib/divider';
import classNames from 'classnames/bind';
import styles from 'scss/components/_navigation';
import LoginComponent from 'components/UI/LoginComponent';
import SignUpComponent from 'components/UI/SignUpComponent';

const cx = classNames.bind(styles);

// Element styling
const customBodyStyle = {
  padding: '0px 24px 24px 24px'
};

//this replaces dialog titles to add exit button
const customIcon = {
  float: 'right',
  margin: '0px 0px 0px 0px',
};
const iconMedium = {
  fontSize: '10px',
  color: 'blue'
}
// Element styling end

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }


  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    console.log('close handling')
    this.props.handleClear;
    this.setState({open: false});
  };

  render (){
     const title = 
        <IconButton
          style={customIcon}
          onTouchTap={this.handleClose}
          >
    					<i className={cx('material-icons', 'md-18')}>close</i>
    		</IconButton>;
    
    return (
      <div className={cx('navigation__button')}>
        <RaisedButton label='Registruokis' onTouchTap={this.handleOpen} />
        <Dialog 
          repositionOnUpdate={true}
          modal={false}
          open={this.state.open}
          title={title}
          onRequestClose={this.handleClose}
          autoDetectWindowHeight={false}
          className={cx('dialog-scroll')}
        >
    	  <SignUpTab
    	    Dialog={"signupdialog"}
    	    />
    	
        </Dialog>
      </div>
    );
  }
}

class LoginDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.props.handleClear;
    this.setState({open: false});
  };

  render() {
    const title = 
      <IconButton
          style={customIcon}
          onTouchTap={this.handleClose}
          >
    					<i className={cx('material-icons', 'md-18')}>close</i>
    		</IconButton>;
    
    return (
      <div className={cx('navigation__button')}>
        <RaisedButton label='Prisijunk' onTouchTap={this.handleOpen} />
        <Dialog 
          title={title}
          repositionOnUpdate={true}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoDetectWindowHeight={false}
          className={cx('dialog-scroll')}
        >
        	<SignUpTab
        	  Dialog={'logindialog'}
        	/>
    	
        </Dialog>
      </div>
    );
  }
}

LoginDialog.propTypes = {
   handleClear: PropTypes.func
};
SignUpDialog.propTypes = {
   handleClear: PropTypes.func
};


// Tabs that go into Dialogs

class SignUpTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'default',
    };
  }
  
    tabChange = (newTab) => {
    console.log('click', newTab);
    this.setState({activeTab: newTab});
  }
  
  render (){
  return (
    <div>
      { this.props.Dialog === 'signupdialog' ? 
      <SignUpTabs 
         activeTab={this.state.activeTab}
         tabChange={this.tabChange}
      />
      : 
      <SignUpTabs 
         activeTab={'login'}
         tabChange={this.tabChange}
      />
      }
      </div>
    );
  }
}

// Components that go into dialogs

class SignUpTabs extends React.Component{
  handleClick = (newTab) => {
    this.props.tabChange(newTab)
  }
  
  render() {
    return (
            <div>
         {this.props.activeTab === 'default' ?
           <div>
          	    <h2 className={cx('simple-heading')}>Tapk nariu!</h2>
              		
              		<div className={cx('simple-margin')}>Prisijunk su Google, Facebook (later) </div>
                  <Divider />
                  <div className={cx('simple-margin')}>Registruokis su savo<a onTouchTap={this.handleClick.bind(this,'localsingup')}> Email </a> </div>
                  <div className={cx('simple-margin')}>Jau esi prisiregistravęs?<a onTouchTap={this.handleClick.bind(this,'login')}> Junkis </a> </div>
            </div>
            	:null}
      
      {this.props.activeTab === 'localsingup' ?
            <div>
	             <h2 className={cx('simple-heading')}>Įsirenk naują portą</h2>
	             <SignUpComponent />
	          </div>       
            	:null}
      {this.props.activeTab === 'login' ?
            <div>
	             <h2 className={cx('simple-heading')}>Junkis</h2>
	             <div className={cx('simple-margin')}>Prisijunk su Google, Facebook (later) </div>
	             <Divider />
	             <LoginComponent />
	          </div>       
            	:null}
      </div>
      
      )
  }
}

const AuthenticationDialogs = () => {
  return <div><LoginDialog /><SignUpDialog /></div>
}


export default AuthenticationDialogs;