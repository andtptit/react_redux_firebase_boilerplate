import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import menu from '../../Assets/images/menu.png';
import logoUrl from '../../Assets/images/logo_thtt.png';
import {signOut} from '../../Store/actions/authActions';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

import useStyle from './style';
import SettingMenu from './SettingMenu';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown, 
} from 'reactstrap';

const Navigation = ({auth, links, currentUser}) => {

  const classes = useStyle();
  const theme = useTheme();
  const isXsDevice = useMediaQuery(theme.breakpoints.up('xs'));

  const [showInput, setShowInput] = useState(isXsDevice);
  const [anchorMenu, setAnchorMenu] = useState(null);

  const onOpenMenu = (e) => {
    setAnchorMenu(e.currentTarget)
  }
  
  
  const onCloseMenu = () => setAnchorMenu(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    console.log('toggle');
    setAnchorMenu(false)
    setIsOpen(!isOpen)
  };

  console.log('isOpen', isOpen);

  return (
    <div className={`${classes.navWrapper} w-100vw`} id="dynoNav">
      <div className={`${classes.nav} w-100`}>
        <div className={`${classes.navCus} w-100 container h-100 flex-center--ver`}>
          <Navbar  expand="md" className="navbar custom-navbar">
              {/* Logo */}
              {(isXsDevice || !showInput) && (
                <Link to="/">
                  <img
                    className={`${classes.imgSize} ${classes.logo}`}
                    src={logoUrl}
                    alt="Logo"
                  />
                </Link>
              )}

          {auth && auth.uid ? (
            <>
            <div className={`${classes.control} flex-center--ver`}>
              <NavbarToggler className={`${classes.menuSize}`} onClick={toggle} >
                  <img
                    className={`${classes.menuSize}`}
                    src={menu}
                    alt="toggle"
                  />
                </NavbarToggler>
            </div>
              <Collapse isOpen={isOpen} navbar>
                <Nav className={`${classes.navDropdown} ml-auto`} navbar>
                  {links.map((link)=> (
                  <NavItem className="navitem mr-3" key={link.url}>
                    <NavLink className={`${classes.navDropdownTitle}`} href={link.url}>{link.route}</NavLink>
                  </NavItem>
                  ))}
                </Nav>
                  <Avatar
                    onClick={onOpenMenu}
                    className={`${classes.imgSize} ${classes.avt} cur-pointer`}
                    alt="Username"
                    src=""
                  />
              </Collapse>
              </>
            ) : (
              <Link to="/login" style={{marginLeft: 'auto'}}>
                <Button
                  className="_btn _btn-primary"
                  classes={{
                    root: classes.loginBtn,
                    label: classes.loginLabel,
                  }}
                  variant="contained"
                  color="primary"
                  size="small">
                  Đăng nhập
                </Button>
              </Link>
            )}
          <SettingMenu anchorEl={anchorMenu} onClose={onCloseMenu} />
          </Navbar>
        </div>
      </div>
    </div>

  );
}

const mapDispatchToProps = (dispatch) =>{
    return{
        signOut : () => dispatch(signOut())
    }
  }
  

export default connect(null,mapDispatchToProps)(Navigation);
