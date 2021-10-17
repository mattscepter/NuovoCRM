import { SET_ALERT } from '../actionTypes';

const initialState = {
  alert: {
    message: '',
    error: null,
  },
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        alert: action.payload,
      };
    default:
      return state;
  }
};

export { errorReducer };
