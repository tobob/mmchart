import React from "react";
import { Grid, Navbar, NavItem, Nav, Brand } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";

class LoginRegisterButtons extends React.Component {
	unauthicatedUser1stButton() {
		return(
			<LinkContainer to="/login">
        <NavItem>Login</NavItem>
      </LinkContainer>

   )
	}

	unauthicatedUser2ndButton() {
		return(
      <LinkContainer to="/registration">
        <NavItem eventKey={3}>Registration</NavItem>
      </LinkContainer>
    )
	}

	authicatedUser1stButton() {
		return(
			<LinkContainer to="/account">
        <NavItem>Account</NavItem>
      </LinkContainer>

   )
	}

	authicatedUser2ndButton() {
		return(
      <NavItem>
      	<SignOutButton next={() => browserHistory.push("/")} />
      </NavItem>
    )
	}

  render () {
    return (
      <Nav pullRight={true}>
        {this.props.auth.getIn(["user", "attributes", "uid"]) ? this.authicatedUser1stButton() : this.unauthicatedUser1stButton() }
        {this.props.auth.getIn(["user", "attributes", "uid"]) ? this.authicatedUser2ndButton() : this.unauthicatedUser2ndButton() }
      </Nav>
    );
  }
}

export default connect(({auth}) => ({auth}))(LoginRegisterButtons);
