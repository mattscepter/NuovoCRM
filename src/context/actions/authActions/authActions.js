import { SET_USER } from '../../actionTypes';

const setUser = (data) => ({
  type: SET_USER,
  payload: data,
});

const getFromStorage = () => {
  return (dispatch) => {
    const user = JSON.parse(localStorage.getItem('user'));
    dispatch(setUser(user));
  };
};

export { setUser, getFromStorage };
