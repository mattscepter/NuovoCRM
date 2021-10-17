import { SET_CONFIRMATION } from '../actionTypes';

const initialState = {
  confirmation: {
    text: '',
    show: false,
    func: () => {},
  },
};

const confirmationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONFIRMATION:
      return {
        ...state,
        confirmation: action.payload,
      };
    default:
      return state;
  }
};

export { confirmationReducer };
