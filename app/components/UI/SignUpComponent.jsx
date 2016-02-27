import React, { Component, PropTypes, defaultProps } from 'react';
import TextField from 'material-ui/lib/text-field';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { emailSignUpFormUpdate, emailSignUp } from 'actions/users';
import styles from 'scss/components/_navigation';
import RaisedButton from 'material-ui/lib/raised-button';

const cx = classNames.bind(styles);


class SignUpComponent extends React.Component {

    handleSubmit (event) {
      event.preventDefault();
      let formData = Object.assign({},this.props.emailsignup);
      console.log('formData: ' + formData);
      console.dir(formData);
      this.props.dispatch(emailSignUp(formData.form));
  }
  
  
    handleInput (key, val) {
      this.props.dispatch(emailSignUpFormUpdate(key, val.target.value));
  }
  render() {

        return(
            <div>
              <form
                onSubmit={this.handleSubmit.bind(this)}
                >
                <TextField
                  floatingLabelText="Vardas"
                  hintStyle={styles.errorStyle}
                  type="text"
                  value={this.props.emailsignup.form.username}
                  errorText={this.props.emailsignup.errors.username}
                  onChange={this.handleInput.bind(this, "username")}
                  {...this.props.inputProps.username}
                  {...this.props.err.username}
                /><br/>
                <TextField
                  floatingLabelText="Email"
                  hintStyle={styles.errorStyle}
                  type="text"
                  value={this.props.emailsignup.form.email}
                  errorText={this.props.emailsignup.errors.email}
                  onChange={this.handleInput.bind(this, "email")}
                  {...this.props.inputProps.email}
                  {...this.props.err.email}
                /><br/>
                <TextField
                  floatingLabelText="Slaptažodis"
                  hintStyle={styles.errorStyle}
                  type="password"
                  value={this.props.emailsignup.form.password}
                  errorText={this.props.emailsignup.errors.hashed_password}
                  onChange={this.handleInput.bind(this, "password")}
                  {...this.props.inputProps.password}
                  {...this.props.err.hashed_password}
                /><br/>
                <TextField
                  floatingLabelText="Patvirtinkite Slaptažodį"
                  hintStyle={styles.errorStyle}
                  type="password"
                  value={this.props.emailsignup.form.passwordConfirmation}
                  errorText={this.props.emailsignup.errors.passwordConfirmation}
                  onChange={this.handleInput.bind(this, "passwordConfirmation")}
                  {...this.props.inputProps.passwordConfirmation}
                  {...this.props.err.passwordConfirmation}
                /><br/>
                <RaisedButton onTouchTap={this.handleSubmit.bind(this)} label="Registruokis" secondary={true}/>
              </form>
                               
        </div>
)
    }
}


SignUpComponent.PropTypes = {
  emailsignup: PropTypes.object,
  inputProps: PropTypes.shape({
      username: PropTypes.string,
      email: PropTypes.string,
      password: PropTypes.string,
      passwordConfirmation: PropTypes.string,
      submit: PropTypes.string
    }),
  err: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    hashed_password: PropTypes.string,
    passwordConfirmation: PropTypes.string
  })
}

SignUpComponent.defaultProps = {
    inputProps: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      submit: ''
    },
    err : {
      username: '',
      email: '',
      hashed_password: '',
      passwordConfirmation: ''
    }
    
}

function mapStateToProps(state) {
  return {
    emailsignup: state.emailSignUp
  };
}

export default connect(mapStateToProps)(SignUpComponent);