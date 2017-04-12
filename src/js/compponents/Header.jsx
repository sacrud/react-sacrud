import * as React from "react";
import PropTypes from 'prop-types';
import {
  Nav,
  Navbar,
  NavItem,
  NavDropdown,
  MenuItem
} from "react-bootstrap";

export class Header extends React.Component {

  render() {
    let urlHome = this.context.urlHome;
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href={urlHome}>SACRUD</a>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}

Header.contextTypes = {
  urlHome: PropTypes.string
}
