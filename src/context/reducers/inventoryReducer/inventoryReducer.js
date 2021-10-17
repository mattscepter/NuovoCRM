import {
  DELETE_INVENTORY,
  SET_INVENTORY,
  SET_UPDATEINVENTORY,
} from '../../actionTypes';

const initialState = {
  inventory: [],
  update: {},
};

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INVENTORY:
      return {
        ...state,
        inventory: action.payload,
      };
    case DELETE_INVENTORY:
      return {
        ...state,
        inventory: [...state.inventory.filter((c) => c._id !== action.payload)],
      };
    case SET_UPDATEINVENTORY:
      return {
        ...state,
        update: action.payload,
      };

    default:
      return state;
  }
};

export { inventoryReducer };
