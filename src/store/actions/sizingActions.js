import { ADD_SIZING, DEL_SIZING} from './actionTypes';

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