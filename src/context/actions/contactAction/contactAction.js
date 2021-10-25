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
  SET_UPDATEORG,
  SHOW_CONTACTCREATE,
  SHOW_FOLLOWUP,
  SHOW_LEADCREATE,
  SHOW_ORGCREATE,
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

const addContact = (data) => ({
  type: ADD_CONTACT,
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

const createleadCard = (data) => ({
  type: SHOW_LEADCREATE,
  payload: data,
});

const createcontactCard = (data) => ({
  type: SHOW_CONTACTCREATE,
  payload: data,
});

const createorgCard = (data) => ({
  type: SHOW_ORGCREATE,
  payload: data,
});

const setUpdateOrg = (data) => ({
  type: SET_UPDATEORG,
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

const createContact = (values, resetForm, history, setType) => {
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
        dispatch(
          createcontactCard({
            show: false,
            phone: null,
            fromLead: false,
          }),
        );
        history.push(`/contactdetail/${res.data._id}`);
        setType('');
        if (values.organization) {
          dispatch(refreshOrg(values?.organization));
        }
      })
      .catch((err) => {
        console.log(err);
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
      .patch(`/update-contact/${id}/${user._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(refreshContact(id));
        resetForm();
        history.push(`/contactdetail/${id}`);
        dispatch(
          setAlert({ message: 'Contact updated successfully', error: false }),
        );
      })
      .catch((err) => {
        console.log(err);
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

const refreshOrg = (id) => {
  return (dispatch) => {
    axiosInstance
      .get(`/organization/${id}`)
      .then((res) => {
        dispatch(setUpdateOrg(res.data));
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
  refreshContact,
  createFollowUp,
  createleadCard,
  createcontactCard,
  setUpdateOrg,
  refreshOrg,
  createorgCard,
};
