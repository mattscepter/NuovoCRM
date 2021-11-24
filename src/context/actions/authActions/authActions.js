import Cookies from 'js-cookie';
import { AUTH_STATE, SET_USER } from '../../actionTypes';

const setUser = (data) => ({
  type: SET_USER,
  payload: data,
});
const setAuth = (data) => ({
  type: AUTH_STATE,
  payload: data,
});

const getFromStorage = () => {
  return (dispatch) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = Cookies.get('JWT');
    if (user && token) {
      dispatch(setUser(user));
    } else {
      setAuth(false);
    }
  };
};

export { setUser, getFromStorage, setAuth };
