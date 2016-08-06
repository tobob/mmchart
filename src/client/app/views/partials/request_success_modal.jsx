import React, { PropTypes } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { dismissRequestSuccessModal } from "../../actions/info-modals";

class RequestSuccessModal extends React.Component {
  static propTypes = {
    show: PropTypes.bool
  };

  static defaultProps = {
    show: false
  };

  close () {
    this.props.dispatch(dismissRequestSuccessModal());
  }

  render () {
    return (
      <Modal show={this.props.show}
             onHide={this.close.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Great!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            You are now logged in!
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.close.bind(this)}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(({requests}) => ({
  show: requests.get("showSuccessModal")
}))(RequestSuccessModal);