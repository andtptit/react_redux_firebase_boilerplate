import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useStyle from './style';
import {signOut} from '../../../Store/actions/authActions';
import {connect} from 'react-redux';

function SettingMenu({ anchorEl, onClose, signOut }) {
  const classes = useStyle();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(Boolean(anchorEl))
  },[anchorEl])

  const handleOffAnchorEl = () => {
    setOpen(false)
  }

  console.log('anchorEl', anchorEl);

  return (
    <Menu
      classes={{ paper: classes.root }}
      anchorEl={anchorEl}
      disableScrollLock={true}
      getContentAnchorEl={null}
      onClose={onClose}
      open={open}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom',
      }}>
      <Link to="/profile">
        <MenuItem  className={classes.menuItem}>
          <AccountCircleIcon className={classes.icon} fontSize="small" />
          <p className={classes.text}>Thông tin cá nhân</p>
        </MenuItem>
      </Link>

      <Link onClick={handleOffAnchorEl} to="/">
        <MenuItem className={classes.menuItem}>
          <ExitToAppIcon className={classes.icon} fontSize="small" />
          <p className={classes.text} onClick={signOut}>Đăng xuất</p>
        </MenuItem>
      </Link>
      
    </Menu>
  );
}

SettingMenu.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
};

SettingMenu.defaultProps = {
  anchorEl: null,
  onClose: function () {},
};

const mapDispatchToProps = (dispatch) =>{
  return{
      signOut : () => dispatch(signOut())
  }
}

export default connect(null,mapDispatchToProps)(SettingMenu);
