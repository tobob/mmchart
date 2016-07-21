export const DISMISS_REQUEST_SUCCESS_MODAL    = "DISMISS_REQUEST_SUCCESS_MODAL";
export const DISMISS_REQUEST_ERROR_MODAL    = "DISMISS_REQUEST_ERROR_MODAL";

export function dismissRequestSuccessModal() {
  return { type: DISMISS_REQUEST_SUCCESS_MODAL };
}
export function dismissRequestErrorModal() {
  return { type: DISMISS_REQUEST_ERROR_MODAL };
}
