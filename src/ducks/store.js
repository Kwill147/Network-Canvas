import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createHashHistory';

import logger from './middleware/logger';
import epics from './middleware/epics';
import rootReducer from './modules/rootReducer';

export const history = createHistory();

export const store = createStore(
  rootReducer,
  undefined,
  compose(
    autoRehydrate(),
    applyMiddleware(routerMiddleware(history), thunk, epics, logger),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
      ? window.devToolsExtension()
      : f => f,
  ),
);

if (window) {
  window.store = store; // TODO: remove in production.
}

export const persistor = persistStore(store, { blacklist: ['form', 'modals', 'session', 'protocol', 'errors'] });
