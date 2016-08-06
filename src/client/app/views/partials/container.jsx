import React, { PropTypes } from "react";
import { Grid, Navbar, NavItem, Nav, Brand } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import LoginRegisterButtons from "../../components/login_register_buttons"

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
          <LoginRegisterButtons />
        </Navbar>

        <Grid className="content">
          {this.props.children}
        </Grid>
      </div>
    );
  }
}

export default Container;