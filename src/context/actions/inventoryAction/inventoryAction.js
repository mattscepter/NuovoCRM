import Cookies from 'js-cookie';
import axiosInstance from '../../../utils/axiosInstance';
import {
  DELETE_INVENTORY,
  SET_INVENTORY,
  SET_UPDATEINVENTORY,
} from '../../actionTypes';
import { setAlert } from '../errorActions';

const setInventory = (data) => ({
  type: SET_INVENTORY,
  payload: data,
});

const deleteinventory = (data) => ({
  type: DELETE_INVENTORY,
  payload: data,
});

const setupdateinventory = (data) => ({
  type: SET_UPDATEINVENTORY,
  payload: data,
});

const getInventory = () => {
  return (dispatch) => {
    axiosInstance
      .get('/inventories')
      .then((res) => {
        dispatch(setInventory(res.data));
      })
      .catch((err) => console.log(err));
  };
};

const createInventory = (formdata, resetForm, history) => {
  return (dispatch) => {
    const token = Cookies.get('JWT');
    const user = JSON.parse(localStorage.getItem('user'));
    axiosInstance
      .post(`/add-inventory/${user._id}`, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(getInventory());
        resetForm();
        history.push('/inventory');
        dispatch(
          setAlert({
            message: 'Inventory created successfully',
            error: false,
          }),
        );
      })
      .catch((err) => {
        dispatch(
          setAlert({ message: 'Error creating inventory', error: true }),
        );
        resetForm();
      });
  };
};

const updateInventory = (id, data, resetForm, history) => {
  return (dispatch) => {
    console.log(data);
    const token = Cookies.get('JWT');
    const user = JSON.parse(localStorage.getItem('user'));
    axiosInstance
      .put(`/inventory/${id}/${user._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(getInventory());
        resetForm();
        history.push('/inventory');
        dispatch(
          setAlert({
            message: 'Inventory updated successfully',
            error: false,
          }),
        );
      })
      .catch((err) => {
        dispatch(
          setAlert({ message: 'Error updating inventory', error: true }),
        );
        resetForm();
      });
  };
};

const deleteInventory = (data) => {
  return (dispatch) => {
    const token = Cookies.get('JWT');
    const user = JSON.parse(localStorage.getItem('user'));
    axiosInstance
      .delete(`/inventory/${data}/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(
          setAlert({ message: 'Inventory deleted successfully', error: false }),
        );
        dispatch(deleteinventory(data));
      })
      .catch((err) => {
        dispatch(
          setAlert({ message: 'Error deleting inventory', error: true }),
        );
      });
  };
};
const refreshInventory = (id) => {
  return (dispatch) => {
    axiosInstance
      .get(`/inventory/${id}`)
      .then((res) => {
        dispatch(setupdateinventory(res.data));
      })
      .catch();
  };
};

export {
  createInventory,
  getInventory,
  setInventory,
  deleteInventory,
  setupdateinventory,
  updateInventory,
  refreshInventory,
};
