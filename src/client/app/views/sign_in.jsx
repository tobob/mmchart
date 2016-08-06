import React from "react";
import { PageHeader } from "react-bootstrap";
import { connect } from "react-redux";
import { EmailSignInForm } from "redux-auth/material-ui-theme"
import { browserHistory } from "react-router";


class SignIn extends React.Component {
  render () {
    console.log(this.props.requests)
    return (
      <div>
        <PageHeader>Sign In</PageHeader>
        <EmailSignInForm
          next={() => browserHistory.push("/account")}
          endpoint={this.props.pageEndpoint} />
      </div>
    );
  }
}

export default connect(({requests}) => ({requests}))(SignIn);