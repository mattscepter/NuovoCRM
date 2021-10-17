import Cookies from 'js-cookie';
import axiosInstance from '../../../utils/axiosInstance';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  DELETE_ORGANIZATION,
  DELETE_PERSON,
  SET_CONTACT,
  SET_ORGANIZATION,
  SET_PERSONS,
  SET_UPDATECONTACT,
  SHOW_FOLLOWUP,
} from '../../actionTypes';
import { setAlert } from '../errorActions';

const setContact = (data) => ({
  type: SET_CONTACT,
  payload: data,
});

const deletecontact = (data) => ({
  type: DELETE_CONTACT,
  payload: data,
});

const setupdatecontact = (data) => ({
  type: SET_UPDATECONTACT,
  payload: data,
});

const setOrganization = (data) => ({
  type: SET_ORGANIZATION,
  payload: data,
});
const setPerson = (data) => ({
  type: SET_PERSONS,
  payload: data,
});

const addContact = (data) => ({
  type: ADD_CONTACT,
  payload: data,
});

const deletePerson = (data) => ({
  type: DELETE_PERSON,
  payload: data,
});
const deleteOrganization = (data) => ({
  type: DELETE_ORGANIZATION,
  payload: data,
});

const createFollowUp = (data) => ({
  type: SHOW_FOLLOWUP,
  payload: data,
});

const getContact = () => {
  return (dispatch) => {
    axiosInstance
      .get('/contacts')
      .then((res) => {
        dispatch(setContact(res.data));
      })
      .catch((err) => console.log(err));
  };
};

const getOrganization = () => {
  return (dispatch) => {
    axiosInstance
      .get('/organizations')
      .then((res) => {
        dispatch(setOrganization(res.data));
      })
      .catch((err) => console.log(err));
  };
};

const getPersons = () => {
  return (dispatch) => {
    axiosInstance
      .get('/persons')
      .then((res) => {
        dispatch(setPerson(res.data));
      })
      .catch((err) => console.log(err));
  };
};

const createContact = (values, resetForm, history) => {
  return (dispatch) => {
    const token = Cookies.get('JWT');
    const user = JSON.parse(localStorage.getItem('user'));
    axiosInstance
      .post(`/create-contact/${user._id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(addContact(res.data));
        dispatch(
          setAlert({ message: 'Contact created successfully', error: false }),
        );
        resetForm();
        history.push(`/contactdetail/${res.data._id}`);
      })
      .catch((err) => {
        dispatch(setAlert({ message: 'Error creating contact', error: true }));
        resetForm();
      });
  };
};

const updateContact = (id, data, resetForm, history) => {
  return (dispatch) => {
    console.log(data);
    const token = Cookies.get('JWT');
    const user = JSON.parse(localStorage.getItem('user'));
    axiosInstance
      .put(`/update-contact/${id}/${user._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(getContact());
        resetForm();
        history.push('/contacts');
        dispatch(
          setAlert({ message: 'Contact updated successfully', error: false }),
        );
      })
      .catch((err) => {
        dispatch(setAlert({ message: 'Error updating contact', error: true }));
        resetForm();
      });
  };
};

const deleteContact = (data) => {
  return (dispatch) => {
    const token = Cookies.get('JWT');
    const user = JSON.parse(localStorage.getItem('user'));
    axiosInstance
      .delete(`/delete-contact/${data}/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(deletecontact(data));
        dispatch(deletePerson(data));
        dispatch(deleteOrganization(data));
        dispatch(
          setAlert({ message: 'Contact deleted successfully', error: false }),
        );
      })
      .catch((err) => {
        dispatch(setAlert({ message: 'Error deleting contact', error: true }));
      });
  };
};

const refreshContact = (id) => {
  return (dispatch) => {
    axiosInstance
      .get(`/contact/${id}`)
      .then((res) => {
        dispatch(setupdatecontact(res.data));
      })
      .catch();
  };
};

export {
  createContact,
  getContact,
  setContact,
  deleteContact,
  updateContact,
  setupdatecontact,
  getOrganization,
  getPersons,
  refreshContact,
  createFollowUp,
};
