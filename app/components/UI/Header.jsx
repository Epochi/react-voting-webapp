import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Toolbar from 'components/UI/Toolbar';
import AuthenticationDialogs from 'components/UI/SignIn';
import UserUI from 'components/UI/LoggedIn';
import Snackbar from 'components/utils/Snackbar';
/*
const getUINavigation = (authenticated, username) => {
  console.log("authenticated check: " + authenticated);
  return !authenticated ? (<AuthenticationDialogs/>) :  (<UserUI username={username}/>);
  let children =  !authenticated ? (<AuthenticationDialogs handleClear={handleClear} />) :  (<UserUI username={username} handleLogOut={handleLogOut}/>);
}
*/

const Header = ({isWaiting, authenticated, username, handleClear, handleLogOut, handleNewPost}) => {  {
    
    let children =  !authenticated ? (<AuthenticationDialogs handleClear={handleClear} />) :  (<UserUI handleNewPost={handleNewPost} username={username} handleLogOut={handleLogOut}/>);
    let logo = <Link to="/">YouLogo</Link>;
    return (
    <div>    
        <Toolbar
        logo={logo}
        >
        {children}
        </Toolbar>
        {isWaiting ? (<Snackbar/>) : (null)}
    </div>    
  		);
  }
};

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  username: PropTypes.string,
  isWaiting: PropTypes.bool.isRequired,
  handleLogOut: PropTypes.func,
  handleClear: PropTypes.func
};

export default Header;
