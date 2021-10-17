import { combineReducers } from 'redux';
import { authReducer } from './reducers/authReducer/authReducer';
import { confirmationReducer } from './reducers/confirmationReducer';
import { contactReducer } from './reducers/contactReducer/contactReducer';
import { errorReducer } from './reducers/errorReducer';
import { inventoryReducer } from './reducers/inventoryReducer/inventoryReducer';
import { leadsReducer } from './reducers/leadReducer/leadReducer';

const rootReducer = combineReducers({
  user: authReducer,
  lead: leadsReducer,
  inventory: inventoryReducer,
  contact: contactReducer,
  alert: errorReducer,
  confirmation: confirmationReducer,
});

export default rootReducer;
