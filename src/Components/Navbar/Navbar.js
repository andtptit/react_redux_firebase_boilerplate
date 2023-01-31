import React, {useState} from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown, 
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem  
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {signOut} from '../../Store/actions/authActions';


const CustomNavbar = ({links, currentUser, signOut}) => {
    const [isOpen, setIsOpen] = useState(false);  
    const toggle = () => setIsOpen(!isOpen);

    return(
        <div>
        <Navbar  expand="md" className="navbar navbar-custom">
          <NavbarBrand className='navbarBrand--custom' href="/">FlashCard Tiếng Hàn Thầy Tư</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {links.map((link)=> (
              <NavItem className="navitem mr-3" key={link.url}>
                <NavLink className='navLink--custom' href={link.url}>{link.route}</NavLink>
              </NavItem>
              ))}
         
            </Nav>
            {
                currentUser ? 
                <UncontrolledDropdown className="mr-5 profile-menu">
                  <DropdownToggle className="profile-dropdown profile-menu--custom">
                    {currentUser.name ? currentUser.name : ''} 
                  </DropdownToggle>
                  <DropdownMenu className="mt-2">
                    <DropdownItem tag={Link} to="/login" onClick={signOut}>Logout</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>          
              :
                ''
            }
          </Collapse>
        </Navbar>
      </div> 
    )
}

const mapDispatchToProps = (dispatch) =>{
  return{
      signOut : () => dispatch(signOut())
  }
}

export default connect(null,mapDispatchToProps)(CustomNavbar);