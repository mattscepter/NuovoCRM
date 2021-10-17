import {
  DELETE_LEAD,
  REFRESH_LEAD,
  SELECTED_LEAD,
  SET_LEADS,
  SET_UPDATELEAD,
  UPDATE_LEAD,
} from '../../actionTypes';

const initialState = {
  leads: [],
  updatelead: {},
  selectedlead: {},
};

const leadsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LEADS:
      return {
        ...state,
        leads: action.payload,
      };
    case DELETE_LEAD:
      return {
        ...state,
        leads: [...state.leads.filter((c) => c._id !== action.payload)],
      };
    case SET_UPDATELEAD:
      return {
        ...state,
        updatelead: action.payload,
      };
    case UPDATE_LEAD:
      return {
        ...state,
        leads: state?.leads?.map((l) => {
          if (l._id === action.payload._id) {
            return {
              ...l,
              quantity: action.payload.quantity,
              convert: action.payload.convert,
            };
          } else {
            return l;
          }
        }),
        updatelead: {
          ...state.updatelead,
          quantity: action.payload.quantity,
          convert: action.payload.convert,
        },
      };
    case SELECTED_LEAD:
      return {
        ...state,
        selectedlead: action.payload,
      };

    default:
      return state;
  }
};

export { leadsReducer };
