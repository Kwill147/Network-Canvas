import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import device from './device';
import network from './network';
import protocol from './protocol';
import modals from './modals';
import menu from './menu';
import errors from './errors';
import search from './search';

const appReducer = combineReducers({
  router: routerReducer,
  form: formReducer,
  device,
  network,
  protocol,
  modals,
  menu,
  errors,
  search,
});

const rootReducer = (state, action) => {
  let currentState = state;

  if (action.type === 'RESET_STATE') {
    currentState = undefined;
  }

  return appReducer(currentState, action);
};

export default rootReducer;
