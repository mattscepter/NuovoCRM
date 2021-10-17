import {
  ADD_CONTACT,
  ADD_LEAD,
  DELETE_CONTACT,
  DELETE_ORGANIZATION,
  DELETE_PERSON,
  SET_CONTACT,
  SET_ORGANIZATION,
  SET_PERSONS,
  SET_UPDATECONTACT,
  SHOW_FOLLOWUP,
} from '../../actionTypes';

const initialState = {
  contact: [],
  organizations: [],
  persons: [],
  update: {},
  followUp: {
    show: false,
    phone: '',
    fromContact: false,
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
    case SET_PERSONS:
      return {
        ...state,
        persons: action.payload,
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
    case DELETE_PERSON:
      return {
        ...state,
        persons: [...state?.persons?.filter((c) => c?._id !== action?.payload)],
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
      if (action.payload.type === 'Organization') {
        return {
          ...state,
          contact: [action.payload, ...state.contact],
          organizations: [action.payload, ...state.organizations],
        };
      } else {
        return {
          ...state,
          contact: [action.payload, ...state.contact],
          persons: [action.payload, ...state.persons],
        };
      }
    case SHOW_FOLLOWUP:
      return {
        ...state,
        followUp: action.payload,
      };
    default:
      return state;
  }
};

export { contactReducer };
