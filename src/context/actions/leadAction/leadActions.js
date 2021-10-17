import Cookies from 'js-cookie';
import axiosInstance from '../../../utils/axiosInstance';
import {
  ADD_LEAD,
  DELETE_LEAD,
  SELECTED_LEAD,
  SET_LEADS,
  SET_UPDATELEAD,
  UPDATE_LEAD,
} from '../../actionTypes';
import { refreshContact } from '../contactAction/contactAction';
import { setAlert } from '../errorActions';

const setLeads = (data) => ({
  type: SET_LEADS,
  payload: data,
});

const deletelead = (data) => ({
  type: DELETE_LEAD,
  payload: data,
});

const setupdatelead = (data) => ({
  type: SET_UPDATELEAD,
  payload: data,
});

const updatelead = (data) => ({
  type: UPDATE_LEAD,
  payload: data,
});

const selectedlead = (data) => ({
  type: SELECTED_LEAD,
  payload: data,
});

const addLead = (data) => ({
  type: ADD_LEAD,
  payload: data,
});

const getLead = () => {
  return (dispatch) => {
    axiosInstance
      .get('/leads')
      .then((res) => {
        dispatch(setLeads(res.data));
      })
      .catch((err) => console.log(err));
  };
};

const createLead = (values, resetForm, history, id) => {
  return (dispatch) => {
    const token = Cookies.get('JWT');
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(values);
    axiosInstance
      .post(`/create-lead/${user._id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (id) {
          dispatch(refreshContact(id));
        }
        dispatch(addLead(res.data));
        resetForm();
        dispatch(
          setAlert({ message: 'Lead created successfully', error: false }),
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(setAlert({ message: 'Error creating lead', error: true }));
        resetForm();
      });
  };
};

// const updateLead = (id,values, resetForm, history) => {
//   return (dispatch) => {
//     const token = Cookies.get('JWT');
//     const user = JSON.parse(localStorage.getItem('user'));
//     axiosInstance
//       .post(`/lead/${id}/${user._id}`, values, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         dispatch(getLead());
//         resetForm();
//         history.push('/leads');
//       })
//       .catch((err) => {
//         resetForm();
//       });
//   };
// };

const deleteLead = (data) => {
  return (dispatch) => {
    const token = Cookies.get('JWT');
    const user = JSON.parse(localStorage.getItem('user'));
    axiosInstance
      .delete(`/lead/${data}/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(
          setAlert({ message: 'Lead deleted successfully', error: false }),
        );
        dispatch(deletelead(data));
      })
      .catch((err) => {
        dispatch(setAlert({ message: 'Error deleting lead', error: true }));
      });
  };
};

const convertDeal = (values, lead, deal, resetForm, setbutton) => {
  return (dispatch) => {
    const token = Cookies.get('JWT');
    const user = JSON.parse(localStorage.getItem('user'));
    axiosInstance
      .put(`/convert-deal/${lead}/${deal}/${user._id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(refreshLead(deal));
        dispatch(
          setAlert({ message: 'Deal converted successfully', error: false }),
        );
        resetForm();
        setbutton({
          details: true,
          items: false,
          quotation: false,
          order: false,
          invoice: false,
          convert: false,
        });
      })
      .catch((err) => {
        dispatch(setAlert({ message: 'Error converting deal', error: true }));
        resetForm();
      });
  };
};

const refreshLead = (id) => {
  return (dispatch) => {
    axiosInstance
      .get(`/lead/${id}`)
      .then((res) => {
        dispatch(selectedlead(res.data));
      })
      .catch();
  };
};

export {
  getLead,
  setLeads,
  createLead,
  deleteLead,
  setupdatelead,
  convertDeal,
  updatelead,
  selectedlead,
  refreshLead,
};
