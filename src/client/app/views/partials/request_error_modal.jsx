import React, { PropTypes } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { dismissRequestErrorModal } from "../../actions/info-modals";

class RequestErrorModal extends React.Component {
  static propTypes = {
    show: PropTypes.bool
  };

  static defaultProps = {
    show: false
  };

  close () {
    this.props.dispatch(dismissRequestErrorModal());
  }

  render () {
    return (
      <Modal show={this.props.show}
             onHide={this.close.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajax Request Error</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Request to failed.
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
  show: requests.get("showErrorModal")
}))(RequestErrorModal);
