import React, { PropTypes } from "react";
import { Grid, Navbar, NavItem, Nav, Brand } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class Container extends React.Component {
  propTypes: {
    children: PropTypes.node
  };

  render () {
    return (
      <div className="wrapper">
        <Navbar className="main-nav">
          <LinkContainer to="/">
            <Navbar.Brand>Redux Auth 2</Navbar.Brand>
          </LinkContainer>
          <Nav>
            <LinkContainer to="/" onlyActiveOnIndex={true}>
              <NavItem eventKey={1}>Home</NavItem>
            </LinkContainer>
            <LinkContainer to="/account">
              <NavItem eventKey={2}>Account</NavItem>
            </LinkContainer>
            <LinkContainer to="/registration">
              <NavItem eventKey={3}>Registration</NavItem>
            </LinkContainer>
            <LinkContainer to="/chart">
              <NavItem eventKey={4}>Chart</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar>

        <Grid className="content">
          {this.props.children}
        </Grid>
      </div>
    );
  }
}

export default Container;