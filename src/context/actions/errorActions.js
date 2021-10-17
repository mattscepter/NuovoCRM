import { SET_ALERT } from '../actionTypes';

const setAlert = (data) => ({
  type: SET_ALERT,
  payload: data,
});

export { setAlert };
