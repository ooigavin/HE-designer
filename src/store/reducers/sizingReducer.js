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
  planNames: ['Sizing Plan 1','Sizing Plan 2','Sizing Plan 3'],
  planDetails: {
    'Sizing Plan 1': {
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
    },
    'Sizing Plan 2': {
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
    },
    'Sizing Plan 3': {
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
  }
  return state;
};

export default reducer;