import { ADD_SIZING, DEL_SIZING, SAVE_SIZING, GEN_SIZING} from './actionTypes';

export const addSizing = (planName) => {
  return {
    type: ADD_SIZING,
    planName: planName
  };
};

export const delSizing = (key) => {
  return {
    type: DEL_SIZING,
    planName: key
  };
};

export const saveSizing = (key, payload) => {
  return {
    type: SAVE_SIZING,
    planName: key,
    planDetails: payload
  };
};

export const genSizing = (key, payload) => {
  return {
    type: GEN_SIZING,
    planName: key,
    planDetails: payload
  };
};