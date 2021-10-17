import Cookies from 'js-cookie';
import axiosInstance from '../../../utils/axiosInstance';
import { setAlert } from '../errorActions';

const createDeal = (values, resetForm) => {
  return (dispatch) => {
    const token = Cookies.get('JWT');
    axiosInstance
      .post('/add-deal', values, {
        headers: `Bearer ${token}`,
      })
      .then((res) => {
        resetForm();
        dispatch(
          setAlert({ message: 'Deal created successfully', error: false }),
        );
      })
      .catch((err) => {
        resetForm();
        dispatch(setAlert({ message: 'Error creating deal', error: true }));
      });
  };
};

export { createDeal };
