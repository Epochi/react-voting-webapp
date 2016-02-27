import React, {  PropTypes } from 'react';
import TextField from 'material-ui/lib/text-field';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { localLogin, localLoginFormUpdate, localLoginError } from 'actions/users';
import styles from 'scss/components/_navigation';
import RaisedButton from 'material-ui/lib/raised-button';

const cx = classNames.bind(styles);

class LoginComponent extends React.Component {
   
    handleSubmit (event) {
      event.preventDefault();
      let formData = Object.assign({},this.props.locallogin);
      formData.errors = {};
      if(typeof formData.form['username'] === 'undefined' || formData.form['username'].length === 0){
        formData.errors['username'] = 'Langelis negali būti tusčias';
      }
      if (typeof formData.form['password'] === 'undefined' || formData.form['password'].length === 0){
         formData.errors['password'] = 'Langelis negali būti tusčias';
      }
      console.log("obj keys: " + Object.keys(formData.errors).length);
      if (Object.keys(formData.errors).length === 0){
        formData.form['username'] = formData.form['username'].toLowerCase();
        this.props.dispatch(localLogin(formData.form));
      }
      else {
        this.props.dispatch(localLoginError(formData.errors));
      }
  }
  
    handleInput (key, val) {
      this.props.dispatch(localLoginFormUpdate(key, val.target.value));
  }
        

    
    render() {
        return(
        <div>
          <form onSubmit={this.handleSubmit.bind(this)}
          >
                <TextField
                  floatingLabelText="Vartotojo vardas arba El. pašto adresas"
                  hintStyle={styles.errorStyle}
                  type="text"
                  value={this.props.locallogin.form.username}
                  errorText={this.props.locallogin.errors.username}
                  onChange={this.handleInput.bind(this, "username")}
                  {...this.props.inputProps.username}    
                  {...this.props.err.username}
                /><br/>
                <TextField
                  floatingLabelText="Slaptažodis"
                  hintStyle={styles.errorStyle}
                  type="password"
                  value={this.props.locallogin.form.password}
                  errorText={this.props.locallogin.errors.password}
                  onChange={this.handleInput.bind(this, "password")}
                  {...this.props.inputProps.password}
                  {...this.props.err.assword}
                /><br/>
              
                <RaisedButton onTouchTap={this.handleSubmit.bind(this)} label="Prisijunk" secondary={true}/>
           </form>   
        </div>        
            )
    }
}

LoginComponent.PropTypes = {
  emailsignup: PropTypes.object,
  inputProps: PropTypes.shape({
      username: PropTypes.string,
      password: PropTypes.string,
      submit: PropTypes.string
    }),
  err: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string
  })
}

LoginComponent.defaultProps = {
    inputProps: {
      username: '',
      password: '',
      submit: ''
    },
    err : {
      username: '',
      password: ''
    }
    
}

function mapStateToProps(state) {
  return {
    locallogin: state.locallogin
  };
}

export default connect(mapStateToProps)(LoginComponent);