import { createStore, combineReducers, compose } from 'redux';

import placesReducer from './reducers/root';

const rootReducer = combineReducers({
  places: placesReducer
});

let composeEnhancers = compose;

// if in dev mode try and use the redux devtools
if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers());
};

export default configureStore;