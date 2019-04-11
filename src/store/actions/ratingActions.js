import { ADD_RATING, DEL_RATING, SAVE_RATING, GEN_RATING, INIT_RATING} from './actionTypes';

export const addRating = (planName) => {
  return {
    type: ADD_RATING,
    planName: planName
  };
};

export const delRating = (key) => {
  return {
    type: DEL_RATING,
    planName: key
  };
};

export const saveRating = (key, payload) => {
  return {
    type: SAVE_RATING,
    planName: key,
    planDetails: payload
  };
};

export const genRating = (key, payload) => {
  return {
    type: GEN_RATING,
    planName: key,
    planDetails: payload
  };
};

export const initRating = (payload) => {
  return {
    type: INIT_RATING,
    newState: payload
  };
};