import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ScrollView, Picker, Image} from 'react-native';
import { Navigation } from 'react-native-navigation';

import {saveRating, genRating} from '../../store/actions/ratingActions';

import CollapsePanel from '../../UI/CollapsePanel/CollapsePanel';
import IconButton from '../../UI/IconButton/IconButton';
import CalcInput from '../../UI/CalcInput/CalcInput';
import {images} from '../../utils/data';

class CalculateRating extends Component {

  state = {
    front: 'a',
    shell: 'e',
    rear: 'l',
    ratingInput: {      
      ssMassFlow: this.props.rating.planDetails[this.props.planName].ssMassFlow,
      ssInletTemp: this.props.rating.planDetails[this.props.planName].ssInletTemp,
      ssOutletTemp: this.props.rating.planDetails[this.props.planName].ssOutletTemp,
      ssFluidType: this.props.rating.planDetails[this.props.planName].ssFluidType,
      ssHeatCap: this.props.rating.planDetails[this.props.planName].ssHeatCap,
      ssViscosity: this.props.rating.planDetails[this.props.planName].ssViscosity,
      ssDensity: this.props.rating.planDetails[this.props.planName].ssDensity,
      ssConductivity:this.props.rating.planDetails[this.props.planName].ssConductivity,

      tsMassFlow: this.props.rating.planDetails[this.props.planName].tsMassFlow,
      tsInletTemp: this.props.rating.planDetails[this.props.planName].tsInletTemp,
      tsOutletTemp: this.props.rating.planDetails[this.props.planName].tsOutletTemp,
      tsFluidType: this.props.rating.planDetails[this.props.planName].tsFluidType,
      tsHeatCap: this.props.rating.planDetails[this.props.planName].tsHeatCap,
      tsViscosity: this.props.rating.planDetails[this.props.planName].tsViscosity,
      tsDensity: this.props.rating.planDetails[this.props.planName].tsDensity,
      tsConductivity: this.props.rating.planDetails[this.props.planName].tsConductivity,

      ssMaterial: this.props.rating.planDetails[this.props.planName].ssMaterial,
      tsMaterial: this.props.rating.planDetails[this.props.planName].tsMaterial,
      noTubes: this.props.rating.planDetails[this.props.planName].noTubes,
      tubePitch: this.props.rating.planDetails[this.props.planName].tubePitch,
      innerD: this.props.rating.planDetails[this.props.planName].innerD,
      outerD: this.props.rating.planDetails[this.props.planName].outerD,
      tubeLayout: this.props.rating.planDetails[this.props.planName].tubeLayout,
      tubeLength: this.props.rating.planDetails[this.props.planName].tubeLength,
      noPasses: this.props.rating.planDetails[this.props.planName].noPasses,
      noBaffles: this.props.rating.planDetails[this.props.planName].noBaffles,
      shellD: this.props.rating.planDetails[this.props.planName].shellD,
      baffleCut: this.props.rating.planDetails[this.props.planName].baffleCut,
      baffleSpacing: this.props.rating.planDetails[this.props.planName].baffleSpacing,

      tubeUnsupported: this.props.rating.planDetails[this.props.planName].tubeUnsupported,
      tubeYoungs: this.props.rating.planDetails[this.props.planName].tubeYoungs,
      tubeLongitStress: this.props.rating.planDetails[this.props.planName].tubeLongitStress,
      addedMassCoeff: this.props.rating.planDetails[this.props.planName].addedMassCoeff,
      metalMassPer: this.props.rating.planDetails[this.props.planName].metalMassPer,
      acceptableFouling: this.props.rating.planDetails[this.props.planName].acceptableFouling,
      dailyUsage: this.props.rating.planDetails[this.props.planName].dailyUsage,
      acceptableLifespan: this.props.rating.planDetails[this.props.planName].acceptableLifespan
    }
  };

  constructor(props) {
    super(props);
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'infoButton') {
      alert('Helper info for sizing calculation')
    }
    if (buttonId === 'calculationBack') {
      Navigation.pop(this.props.componentId);
    }
  }

  inputChangedHandler = (value, identifier) => {
    const updatedForm = {
      ...this.state.ratingInput
    }
    
    updatedForm[identifier] = value;
    this.setState({ratingInput: updatedForm})
  };

  savePlan = () => {
    this.props.savePlanToStore(this.props.planName, this.state.ratingInput)
  };

  generateReport = () => {
    this.props.genPlan(this.props.planName, this.state.ratingInput)
    alert('PDF report has been generated!')
  };

  render() {
    console.log(this.state.front)
    return (
      <ScrollView>
        <View style={styles.sizingContainer}>
          <View style={styles.shellContainer}>
            <View style={styles.shellItem}>
              <Image source={images[this.state.front].path} style={{width: 80, height: 80}}/>
              <Picker
                selectedValue={this.state.front}
                style={{height: 50, width: 100}}
                mode = 'dropdown'
                onValueChange={(itemValue, itemIndex) =>{
                  console.log(itemValue)
                  this.setState({front: itemValue})}
                }>
                <Picker.Item label="A-Type" value="a" />
                <Picker.Item label="B-Type" value="b" />
                <Picker.Item label="C-Type" value="c" />
                <Picker.Item label="N-Type" value="nf" />
                <Picker.Item label="D-Type" value="d" />
              </Picker>
            </View>
            <View style={styles.shellItem}>
              <Image source={images[this.state.shell].path} style={{width: 80, height: 80}}/>
              <Picker
                selectedValue={this.state.shell}
                style={{height: 50, width: 100}}
                mode = 'dropdown'
                onValueChange={(itemValue, itemIndex) =>{
                  console.log(itemValue)
                  this.setState({shell: itemValue})}
                }>
                <Picker.Item label="E-Type" value="e" />
                <Picker.Item label="F-Type" value="f" />
                <Picker.Item label="G-Type" value="g" />
                <Picker.Item label="H-Type" value="h" />
                <Picker.Item label="J-Type" value="j" />
              </Picker>
            </View>
            <View style={styles.shellItem}>
              <Image source={images[this.state.rear].path} style={{width: 80, height: 80}}/>
              <Picker
                selectedValue={this.state.rear}
                style={{height: 50, width: 100}}
                mode = 'dropdown'
                onValueChange={(itemValue, itemIndex) =>{
                  console.log(itemValue)
                  this.setState({rear: itemValue})}
                }>
                <Picker.Item label="L-Type" value="l" />
                <Picker.Item label="M-Type" value="m" />
                <Picker.Item label="N-Type" value="nr" />
                <Picker.Item label="P-Type" value="p" />
                <Picker.Item label="S-Type" value="s" />
              </Picker>
            </View>
          </View>
          
          <CollapsePanel panelName='Shell-side'>
            <View>
              <CalcInput label='Mass Flow Rate' placeholder='Mass Flow Rate' change={value => this.inputChangedHandler(value, 'ssMassFlow')} value={this.state.ratingInput.ssMassFlow}/>
              <CalcInput label='Inlet Temp' placeholder='Inlet Temp' change={value => this.inputChangedHandler(value, 'ssInletTemp')} value={this.state.ratingInput.ssInletTemp}/>
              <CalcInput label='Outlet Temp' placeholder='Outlet Temp' change={value => this.inputChangedHandler(value, 'ssOutletTemp')} value={this.state.ratingInput.ssOutletTemp}/>
              <CalcInput label='Fluid Type' placeholder='Fluid Type' change={value => this.inputChangedHandler(value, 'ssFluidType')} value={this.state.ratingInput.ssFluidType}/>
              <CalcInput label='Heat Capacity' placeholder='Heat Capacity' change={value => this.inputChangedHandler(value, 'ssHeatCap')} value={this.state.ratingInput.ssHeatCap}/>
              <CalcInput label='Viscosity' placeholder='Viscosity' change={value => this.inputChangedHandler(value, 'ssViscosity')} value={this.state.ratingInput.ssViscosity}/>
              <CalcInput label='Density' placeholder='Density' change={value => this.inputChangedHandler(value, 'ssDensity')} value={this.state.ratingInput.ssDensity}/>
              <CalcInput label='Conductivity' placeholder='Conductivity' change={value => this.inputChangedHandler(value, 'ssConductivity')} value={this.state.ratingInput.ssConductivity}/>
            </View>
          </CollapsePanel>

          <CollapsePanel panelName='Tube-side'>
            <View>
              <CalcInput label='Mass Flow Rate' placeholder='Mass Flow Rate' change={value => this.inputChangedHandler(value, 'tsMassFlow')} value={this.state.ratingInput.tsMassFlow}/>
              <CalcInput label='Inlet Temp' placeholder='Inlet Temp' change={value => this.inputChangedHandler(value, 'tsInletTemp')} value={this.state.ratingInput.tsInletTemp}/>
              <CalcInput label='Outlet Temp' placeholder='Outlet Temp' change={value => this.inputChangedHandler(value, 'tsOutletTemp')} value={this.state.ratingInput.tsOutletTemp}/>
              <CalcInput label='Fluid Type' placeholder='Fluid Type' change={value => this.inputChangedHandler(value, 'tsFluidType')} value={this.state.ratingInput.tsFluidType}/>
              <CalcInput label='Heat Capacity' placeholder='Heat Capacity' change={value => this.inputChangedHandler(value, 'tsHeatCap')} value={this.state.ratingInput.tsHeatCap}/>
              <CalcInput label='Viscosity' placeholder='Viscosity' change={value => this.inputChangedHandler(value, 'tsViscosity')} value={this.state.ratingInput.tsViscosity}/>
              <CalcInput label='Density' placeholder='Density' change={value => this.inputChangedHandler(value, 'tsDensity')} value={this.state.ratingInput.tsDensity}/>
              <CalcInput label='Conductivity' placeholder='Conductivity' change={value => this.inputChangedHandler(value, 'tsConductivity')} value={this.state.ratingInput.tsConductivity}/>
            </View>
          </CollapsePanel>

          <CollapsePanel panelName='Physical Properties'>
            <View>
              <CalcInput label='Shell-Side Material' placeholder='Shell-Side Material' change={value => this.inputChangedHandler(value, 'ssMaterial')} value={this.state.ratingInput.ssMaterial}/>
              <CalcInput label='Tube-Side Material' placeholder='Tube-Side Material' change={value => this.inputChangedHandler(value, 'tsMaterial')} value={this.state.ratingInput.tsMaterial}/>
              <CalcInput label='Number of Tubes' placeholder='Number of Tubes' change={value => this.inputChangedHandler(value, 'noTubes')} value={this.state.ratingInput.noTubes}/>
              <CalcInput label='Tube Pitch' placeholder='Tube Pitch' change={value => this.inputChangedHandler(value, 'tubePitch')} value={this.state.ratingInput.tubePitch}/>
              <CalcInput label='Tube Layout' placeholder='Tube Layout' change={value => this.inputChangedHandler(value, 'tubeLayout')} value={this.state.ratingInput.tubeLayout}/>
              <CalcInput label='Tube Length' placeholder='Tube Length' change={value => this.inputChangedHandler(value, 'tubeLength')} value={this.state.ratingInput.tubeLength}/>
              <CalcInput label='Tube Inner Diameter' placeholder='Tube Inner Diameter' change={value => this.inputChangedHandler(value, 'innerD')} value={this.state.ratingInput.innerD}/>
              <CalcInput label='Tube Outer Diameter' placeholder='Tube Outer Diameter' change={value => this.inputChangedHandler(value, 'outerD')} value={this.state.ratingInput.outerD}/>
              <CalcInput label='Number of Passes' placeholder='Number of Passes' change={value => this.inputChangedHandler(value, 'noPasses')} value={this.state.ratingInput.noPasses}/>
              <CalcInput label='Number of Baffles' placeholder='Number of Baffles' change={value => this.inputChangedHandler(value, 'noBaffles')} value={this.state.ratingInput.noBaffles}/>
              <CalcInput label='Baffle Cut' placeholder='Baffle Cut' change={value => this.inputChangedHandler(value, 'baffleCut')} value={this.state.ratingInput.baffleCut}/>
              <CalcInput label='Baffle Spacing' placeholder='Baffle Spacing' change={value => this.inputChangedHandler(value, 'baffleSpacing')} value={this.state.ratingInput.baffleSpacing}/>
              <CalcInput label='Shell Diameter' placeholder='Shell Diameter' change={value => this.inputChangedHandler(value, 'shellD')} value={this.state.ratingInput.shellD}/>
            </View>
          </CollapsePanel>

          <CollapsePanel panelName='Fouling & Vibration Properties'>
            <View>
              <CalcInput label='Tube Unsupported Length' placeholder='Tube Unsupported Length' change={value => this.inputChangedHandler(value, 'tubeUnsupported')} value={this.state.ratingInput.tubeUnsupported}/>
              <CalcInput label='Tube Youngs Modulus' placeholder='Tube Youngs Modulus' change={value => this.inputChangedHandler(value, 'tubeYoungs')} value={this.state.ratingInput.tubeYoungs}/>
              <CalcInput label='Tube Longitudinal Stress' placeholder='Tube Longitudinal Stress' change={value => this.inputChangedHandler(value, 'tubeLongitStress')} value={this.state.ratingInput.tubeLongitStress}/>
              <CalcInput label='Added Mass Coefficient' placeholder='Added Mass Coefficient' change={value => this.inputChangedHandler(value, 'addedMassCoeff')} value={this.state.ratingInput.addedMassCoeff}/>
              <CalcInput label='Metal Mass/Length' placeholder='Metal Mass/Length' change={value => this.inputChangedHandler(value, 'metalMassPer')} value={this.state.ratingInput.metalMassPer}/>
              <CalcInput label='Acceptable Fouling' placeholder='Acceptable Fouling' change={value => this.inputChangedHandler(value, 'acceptableFouling')} value={this.state.ratingInput.acceptableFouling}/>
              <CalcInput label='Hrs of Use (Daily)' placeholder='Hrs of Use (Daily)' change={value => this.inputChangedHandler(value, 'dailyUsage')} value={this.state.ratingInput.dailyUsage}/>
              <CalcInput label='Acceptable Lifespan' placeholder='Acceptable Lifespan' change={value => this.inputChangedHandler(value, 'acceptableLifespan')} value={this.state.ratingInput.acceptableLifespan}/>
            </View>
          </CollapsePanel>
        </View>
        <View style={styles.buttonContainer}>
          <IconButton bgColor='#99E0E7' iconName='md-save' iconSize={30} onPress={this.savePlan}>Save</IconButton>
          <IconButton bgColor='#99E0E7' iconName='md-download' iconSize={30} onPress={this.generateReport}>Generate Report</IconButton>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  sizingContainer: {
    width: '90%',
    marginLeft: 10,
    marginTop: 10,
    alignItems:'center'
  },
  buttonContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  shellContainer:{
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5
  },
  shellItem:{
    margin: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    alignItems:'center'
  }
});

//connect is a function that returns a higher order function
const mapStateToProps = state => {
  return {
    rating: state.rating,
  };
};

// dispatch will be called when the function is called
const mapDispatchToProps = dispatch =>{
  return {
      savePlanToStore: (name, details) => dispatch(saveRating(name, details)),
      genPlan: (name, details) => dispatch(genRating(name, details))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(CalculateRating);