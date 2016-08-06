import React from "react";
import RequestErrorModal from './request_error_modal';
import RequestSuccessrModal from './request_success_modal';

export default class GlobalComponents extends React.Component {
  render () {
    return (
      <div>
        <RequestErrorModal />
        <RequestSuccessrModal />
      </div>
    );
  }
}