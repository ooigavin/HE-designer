import * as actionTypes from './../actions/actionTypes'

import {ReTube} from '../../utils/equations/equations';

const defaultDetail = {
  generated: false,

  ssMassFlow: 80000,
  ssInletTemp: 35,
  ssOutletTemp: 25,
  ssFluidType: 'water',
  ssHeatCap: 4178.5,
  ssViscosity: 0.000797,
  ssDensity: 995.7,
  ssConductivity: 0.614,

  tsMassFlow: 140000,
  tsInletTemp: 20,
  tsOutletTemp: 25,
  tsFluidType: 'water',
  tsHeatCap: 4179,
  tsViscosity: 0.00095,
  tsDensity: 997,
  tsConductivity: 0.6065,

  ssMaterial: 'steel',
  tsMaterial: 'iron',
  noTubes: 81,
  tubePitch: 0.03175,
  innerD: 0.0229108,
  outerD: 0.0254,
  tubeLayout: 90,
  noPasses: 1,
  noBaffles: 35,
  shellD: 0.38735,
  baffleCut: 25,
  baffleSpacing: 0.3048,

  tubeUnsupported: 2.5,
  tubeYoungs: 68900000000,
  tubeLongitStress: 90000000,
  addedMassCoeff: 1.5,
  metalMassPer: 0.255,
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
      console.log(action.type)
      console.log(action.planDetails)
      updatedDetails = {
        ...state.planDetails,
        [action.planName]: action.planDetails
      }
      const reTube = ReTube(action.planDetails)
      
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