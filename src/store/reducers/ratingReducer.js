import * as actionTypes from './../actions/actionTypes'
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import {ReTube, Pr, NuTube, Ht, Ft, PressureTube, Ut, At, AreaS, ReShell, De, generateHTML} from '../../utils/equations';

const defaultDetail = {
  generated: false,

  ssMassFlow: 80000/3600,
  ssInletTemp: 35,
  ssOutletTemp: 25,
  ssFluidType: 'water',
  ssHeatCap: 4178.5,
  ssViscosity: 0.000797,
  ssDensity: 995.7,
  ssConductivity: 0.614,

  tsMassFlow: 140000/3600,
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
  tubeLength: 3,
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
      
      let params = action.planDetails
      const at = At(params.innerD, params.noTubes)
      const ut = Ut(params, at)
      const reTube = ReTube(params)
      const prTube = Pr(params)
      const ft = Ft(reTube)
      const nuTube = NuTube(params, reTube, prTube, ft)
      const hTube = Ht(params, nuTube)
      const pressureTube = PressureTube(params, ft, ut)
      const de = De(params)
      const As = AreaS(params)
      const reShell = ReShell(params, As, de)
      const hShell = 12
      const pressureShell = 12

      //checks
      const fouling = 45
      const fn = 12
      const damp = 32
      const critSpeed = 1

      let pass = ut < critSpeed && fouling < params.acceptableFouling
        ? true
        : false

      let results = {
        passed: pass,
        hTube: hTube,
        pressureTube: pressureTube,
        hShell: hShell,
        pressureShell: pressureShell,
        fouling: fouling,
        fn: fn,
        damp: damp,
        critSpeed: critSpeed
      }
      // generate pdf
      const htmlContent =  generateHTML(action.planName, 'rating', params, results)

      let options = {
        html: htmlContent,
        fileName: action.planName +'-Rating',
        directory: 'Documents'
      };
      console.log(htmlContent)
      RNHTMLtoPDF.convert(options).then(filePath => {
        console.log('PDF generated', filePath);
      
      });

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