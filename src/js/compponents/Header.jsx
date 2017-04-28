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
    let title = this.context.title;
    let urlHome = this.context.urlHome;
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href={urlHome}>{title}</a>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}

Header.contextTypes = {
  title: PropTypes.string,
  urlHome: PropTypes.string
}
