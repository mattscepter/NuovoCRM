import { SET_CONFIRMATION } from '../actionTypes';

const setConfirmation = (data) => ({
  type: SET_CONFIRMATION,
  payload: data,
});

export { setConfirmation };
