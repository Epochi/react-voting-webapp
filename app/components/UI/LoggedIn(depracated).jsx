import React, { PropTypes } from 'react';
import Popover from 'material-ui/lib/popover/popover';
import MenuItem from 'material-ui/lib/menus/menu-item';
import PopoverAnimationFromTop from 'material-ui/lib/popover/popover-animation-from-top';
import RaisedButton from 'material-ui/lib/raised-button';
import classNames from 'classnames/bind';
import Divider from 'material-ui/lib/divider';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';
import Button from 'components/utils/Button';


class UserDropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleTouchTap = (event) => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div>
        <Button 
          label="dicks"
          onTouchTap={this.handleTouchTap}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
          animation={PopoverAnimationFromTop}
        >
          <div>
            <MenuItem value={1} primaryText="Paskyra"/>
            <MenuItem value={2} primaryText="Pagalba"/>
            <Divider />
            <MenuItem value={3} primaryText="Postai"/>
            <MenuItem value={4} primaryText="Komentarai"/>
            <Divider />
            <MenuItem value={5} primaryText="Nustatymai"/>
            <MenuItem value={6} primaryText="Atsijungti"/>
        </div>
        </Popover>
      </div>
    );
  }
}
UserDropdown.propTypes = {
   handleLogOut: PropTypes.func
};



const UserUI = ({username}) => {
  return <div><Button label={username}/><UserDropdown/></div>
};
UserUI.propTypes = {
  username: PropTypes.string,
  handleLogOut: PropTypes.func
};

export default UserUI;

