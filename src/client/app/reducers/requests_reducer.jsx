import Immutable from "immutable";
import { createReducer } from "redux-immutablejs";
import * as ModalsActions from "../actions/info-modals";

const initialState = Immutable.fromJS({
  showSuccessModal: false,
  showErrorModal: false,
  lastRequestUrl: null,
  buttons: {}
});

export default createReducer(initialState, {
  ['EMAIL_SIGN_IN_START']: (state, {key}) => state.mergeDeep({
    buttons: {
      [key]: {
        loading: true
      }
    }
  }),

  ['EMAIL_SIGN_IN_COMPLETE']: (state, {key}) => state.mergeDeep({
    buttons: {
      [key]: {
        loading: false
      }
    },
    showSuccessModal: true,
    lastRequestUrl: key
  }),

  ['EMAIL_SIGN_IN_ERROR']: (state, {key}) => state.mergeDeep({
    buttons: {
      [key]: {
        loading: false
      }
    },
    showErrorModal: true,
    lastRequestUrl: key
  }),

  [ModalsActions.DISMISS_REQUEST_SUCCESS_MODAL]: state => state.merge({
    showSuccessModal: false,
    lastRequestUrl: null
  }),

  [ModalsActions.DISMISS_REQUEST_ERROR_MODAL]: state => state.merge({
    showErrorModal: false,
    lastRequestUrl: null
  })
});