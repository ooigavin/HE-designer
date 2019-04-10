import * as actionTypes from './../actions/actionTypes'

const defaultDetail = {
  generated: false,
  ssPressureDrop: 1,
  ssMassFlow: 0,
  ssInletTemp: 0,
  ssOutletTemp:0,
  ssFluidType: 'water',
  tsMassFlow: 0,
  tsInletTemp: 0,
  tsOutletTemp: 0,
  tsFluidType: 'water',
  ssMaterial: 'steel',
  tsMaterial: 'iron',
  acceptableFouling: 98,
  dailyUsage: 6,
  acceptableLifespan: 200
}

const initialState = {
  planNames: [],
  planDetails: {}
}

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.ADD_RATING:
      let updatedDetails = {}
      let updatedNames = []
      if (state.planNames){
          updatedDetails = state.planNames.reduce((newDetails, key)=>{ 
          newDetails[key] = state.planDetails[key];
          return newDetails;
          },{});
          updatedNames = [...state.planNames]
      }
      updatedDetails[action.planName] = {...defaultDetail}
      console.log(updatedDetails)
      console.log(updatedDetails)
      return {
        ...state,
        planNames: updatedNames.concat(action.planName),
        planDetails: updatedDetails
      };

    case actionTypes.DEL_RATING:
      updatedDetails = state.planNames.reduce((newDetails, key)=>{ 
        if (key != action.planName){
          newDetails[key] = state.planDetails[key];
        }
        return newDetails;
      },{});
      console.log(updatedDetails)
      return {
        ...state,
        planNames: state.planNames.filter(plans => {
          return plans !== action.planName;
        }),
        planDetails: updatedDetails
      };

    case actionTypes.SAVE_RATING:
      console.log('hello')
      console.log(action.planName)
      console.log(action.type)
      console.log(action.planDetails)
      updatedDetails = {
        ...state.planDetails,
        [action.planName]: action.planDetails
      }

      console.log(updatedDetails)
      return {
        ...state,
        planDetails: updatedDetails
      };

    case actionTypes.GEN_RATING:
      console.log('rating')
      console.log(action.planName)
      console.log(action.type)
      console.log(action.planDetails)
      updatedDetails = {
        ...state.planDetails,
        [action.planName]: action.planDetails
      }

      // change generated state to true
      updatedDetails[action.planName]['generated'] = true
      console.log(updatedDetails)
      return {
        ...state,
        planDetails: updatedDetails
      };
  }
  return state;
};

export default reducer;