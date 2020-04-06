import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'services/reducers';

/* eslint-disable no-underscore-dangle */
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer /* preloadedState, */,
  composeEnhancer(applyMiddleware(thunk)),
);
/* eslint-enable */

export default store;
