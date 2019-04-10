import * as actionTypes from './../actions/actionTypes'

const defaultDetail = {
  ssPressureDrop: 0,
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
  planNames: ['E-type sizing plan','Sizing plan 2','U-tube sizing'],
  planDetails: {
    'E-type sizing plan': {
      ssPressureDrop: 'hello there',
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
    },
    'Sizing plan 2': {
      ssPressureDrop: 'whats your name',
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
    },
    'U-tube sizing': {
      ssPressureDrop: 2,
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
    },
  }
}

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.ADD_SIZING:

      let updatedDetails = state.planNames.reduce((newDetails, key)=>{ 
        newDetails[key] = state.planDetails[key];
        return newDetails;
      },{});
      console.log(updatedDetails)
      updatedDetails[action.planName] = {...defaultDetail}
      console.log(updatedDetails)
      return {
        ...state,
        planNames: state.planNames.concat(action.planName),
        planDetails: updatedDetails
      };

    case actionTypes.DEL_SIZING:
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

    case actionTypes.SAVE_SIZING:
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
  }
  return state;
};

export default reducer;