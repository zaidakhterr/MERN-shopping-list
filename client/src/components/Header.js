import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavItem,
  NavLink,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Container,
} from 'reactstrap';

export class Header extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render = () => {
    return (
      <div className='.header'>
        <Navbar color='dark' dark expand='sm' className='mb-5'>
          <Container>
            <NavbarBrand href='/'>Shopping List</NavbarBrand>
            <NavbarToggler onClick={this.toggle} className='toggler' />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                <NavItem>
                  <NavLink href='https://github.com/zaidakhterr/MERN-shopping-list'>
                    Github
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  };
}

export default Header;
