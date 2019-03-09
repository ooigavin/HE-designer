import * as actionTypes from './../actions/actionTypes'

const initialState = {}

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.ADD_SIZING:
      return {
        ...state,
        counter: state.counter + 1
      }
  }
  return state;
};

export default reducer;