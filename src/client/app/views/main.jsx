import React from "react";
import { browserHistory } from "react-router";

import { PageHeader, Row, ButtonGroup, Table } from "react-bootstrap";
import { connect } from "react-redux";


class Main extends React.Component {
  render () {
    return (<div> kokojambo</div>)
  }
}

export default connect(({auth, demoUi}) => {
  return ({
    currentUserUid: auth.getIn(["user", "attributes", "provider"]) || "none",
    currentUserProvider: auth.getIn(["user", "attributes", "uid"]) || "none",
    currentUserEndpoint: auth.getIn(["user", "endpointKey"]) || "none",
  })
})(Main);