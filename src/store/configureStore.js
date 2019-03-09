import { createStore, combineReducers, compose } from 'redux';

import sizingReducer from './reducers/sizingReducer';
import sizingPlanReducer from './reducers/sizingPlanReducer';
import ratingReducer from './reducers/ratingReducer';
import ratingPlanReducer from './reducers/ratingPlanReducer';

const rootReducer = combineReducers({
  sizing: sizingReducer,
  sizingPlan: sizingPlanReducer,
  rating: ratingReducer,
  ratingPlan: ratingPlanReducer
});

let composeEnhancers = compose;``

// if in dev mode try and use the redux devtools
if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers());
};

export default configureStore;