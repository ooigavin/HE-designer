import * as actionTypes from './../actions/actionTypes'
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import {ReTube, Pr, NuTube, Ht, Ft, PressureTube, Ut, At, AreaS, ReShell, De, generateHTML} from '../../utils/equations';

const defaultDetail = {
  generated: false,

  ssMassFlow: 0,
  ssInletTemp: 0,
  ssOutletTemp: 0,
  ssHeatCap: 0,

  tsMassFlow: 0,
  tsInletTemp: 0,
  tsOutletTemp: 0,
  tsHeatCap: 0,
  tsDensity: 0,
  tsVelocity: 0,

  tubePitch: 0,
  innerD: 0,
  outerD: 0,
  tubeLayout: 0,
  noPasses: 0
}

const initialState = {
  planNames: [],
  planDetails: {}
}

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.ADD_SIZING:
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
      updatedDetails = {
        ...state.planDetails,
        [action.planName]: action.planDetails
      }

      console.log(updatedDetails)
      return {
        ...state,
        planDetails: updatedDetails
      };

    case actionTypes.GEN_SIZING:
      console.log(action.type)
      console.log(action.planDetails)

      updatedDetails = {
        ...state.planDetails,
        [action.planName]: action.planDetails
      }
      
      let params = action.planDetails

      let noTubes = 12
      let tubeLength = 35
      let shellD = 123
      let results = {
        noTubes: noTubes,
        tubeLength: tubeLength,
        shellD: shellD
      }
      // generate pdf
      const htmlContent =  generateHTML(action.planName, 'sizing', params, results)

      let options = {
        html: htmlContent,
        fileName: action.planName +'-Sizing',
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