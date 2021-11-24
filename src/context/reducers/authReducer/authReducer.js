import { AUTH_STATE, SET_USER } from '../../actionTypes';

const initialState = {
  user: {},
  auth: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case AUTH_STATE:
      return {
        ...state,
        auth: action.payload,
      };
    default:
      return state;
  }
};

export { authReducer };
