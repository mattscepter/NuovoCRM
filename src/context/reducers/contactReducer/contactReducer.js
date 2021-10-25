import {
  ADD_CONTACT,
  ADD_LEAD,
  DELETE_CONTACT,
  DELETE_ORGANIZATION,
  SET_CONTACT,
  SET_ORGANIZATION,
  SET_UPDATECONTACT,
  SET_UPDATEORG,
  SHOW_CONTACTCREATE,
  SHOW_FOLLOWUP,
  SHOW_LEADCREATE,
  SHOW_ORGCREATE,
} from '../../actionTypes';

const initialState = {
  contact: [],
  organizations: [],
  update: {},
  selectedOrg: {},
  followUp: {
    show: false,
    phone: '',
    fromContact: false,
  },
  leadCreate: {
    show: false,
    phone: '',
    fromContact: false,
  },
  contactCreate: {
    show: false,
    phone: '',
    fromLead: false,
  },
  orgCreate: {
    show: false,
  },
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTACT:
      return {
        ...state,
        contact: action.payload,
      };
    case SET_ORGANIZATION:
      return {
        ...state,
        organizations: action.payload,
      };

    case DELETE_CONTACT:
      return {
        ...state,
        contact: [...state.contact.filter((c) => c._id !== action.payload)],
      };
    case DELETE_ORGANIZATION:
      return {
        ...state,
        organizations: [
          ...state?.organizations?.filter((c) => c?._id !== action?.payload),
        ],
      };
    case SET_UPDATECONTACT:
      return {
        ...state,
        update: action.payload,
      };
    case ADD_LEAD:
      return {
        ...state,
        contact: state?.contact?.map((c) => {
          if (c._id === action.payload.contactId) {
            return {
              ...c,
              allLeads: [...c.allLeads, action.payload],
            };
          } else {
            return c;
          }
        }),
      };
    case ADD_CONTACT:
      return {
        ...state,
        contact: [action.payload, ...state.contact],
      };
    case SHOW_FOLLOWUP:
      return {
        ...state,
        followUp: action.payload,
      };
    case SHOW_LEADCREATE:
      return {
        ...state,
        leadCreate: action.payload,
      };
    case SHOW_CONTACTCREATE:
      return {
        ...state,
        contactCreate: action.payload,
      };
    case SHOW_ORGCREATE:
      return {
        ...state,
        orgCreate: action.payload,
      };
    case SET_UPDATEORG:
      return {
        ...state,
        selectedOrg: action.payload,
      };
    default:
      return state;
  }
};

export { contactReducer };
