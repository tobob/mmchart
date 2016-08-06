import React from "react";
import { PageHeader } from "react-bootstrap";
import { connect } from "react-redux";
import { EmailSignUpForm } from "redux-auth/material-ui-theme"
import { browserHistory } from "react-router";

class SignUp extends React.Component {
  render () {
    return (
      <div>
        <PageHeader>Sign Up</PageHeader>
        
        <EmailSignUpForm
          next={() => browserHistory.push("/account")}
          endpoint={this.props.pageEndpoint} />
      </div>
    );
  }
}

export default connect(({routes}) => ({routes}))(SignUp);