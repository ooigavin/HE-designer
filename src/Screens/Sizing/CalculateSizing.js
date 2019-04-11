import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ScrollView, Button, Image } from 'react-native';
import { Navigation } from 'react-native-navigation';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import {saveSizing, genSizing} from '../../store/actions/sizingActions';

import CollapsePanel from '../../UI/CollapsePanel/CollapsePanel';
import IconButton from '../../UI/IconButton/IconButton';
import CalcInput from '../../UI/CalcInput/CalcInput';
import HEImage from '../../assests/images/HE.png';

class CalculateSizing extends Component {

  state = {
    sizingInput: {
      ssMassFlow: this.props.sizing.planDetails[this.props.planName].ssMassFlow,
      ssInletTemp: this.props.sizing.planDetails[this.props.planName].ssInletTemp,
      ssOutletTemp: this.props.sizing.planDetails[this.props.planName].ssOutletTemp,
      ssHeatCap: this.props.sizing.planDetails[this.props.planName].ssHeatCap,

      tsMassFlow: this.props.sizing.planDetails[this.props.planName].tsMassFlow,
      tsInletTemp: this.props.sizing.planDetails[this.props.planName].tsInletTemp,
      tsOutletTemp: this.props.sizing.planDetails[this.props.planName].tsOutletTemp,
      tsHeatCap: this.props.sizing.planDetails[this.props.planName].tsHeatCap,
      tsDensity: this.props.sizing.planDetails[this.props.planName].tsDensity,
      tsVelocity: this.props.sizing.planDetails[this.props.planName].tsVelocity,

      tubePitch: this.props.sizing.planDetails[this.props.planName].tubePitch,
      innerD: this.props.sizing.planDetails[this.props.planName].innerD,
      outerD: this.props.sizing.planDetails[this.props.planName].outerD,
      tubeLayout: this.props.sizing.planDetails[this.props.planName].tubeLayout,
      noPasses: this.props.sizing.planDetails[this.props.planName].noPasses
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
      ...this.state.sizingInput
    }
    
    updatedForm[identifier] = value;
    this.setState({sizingInput: updatedForm})
  };

  savePlan = () => {
    this.props.savePlanToStore(this.props.planName, this.state.sizingInput)
  };

  generateReport = () => {
    this.props.genPlan(this.props.planName, this.state.sizingInput)
    alert('PDF report has been generated!')
  };

  render() {
    console.log(this.props.planName)
    console.log(this.props.sizing.planDetails[this.props.planName])
    return (
      <ScrollView>
        <View style={styles.sizingContainer}>
          <View style={styles.shellContainer}>
            <View style={styles.shellItem}>
              <Image source={require('../../assests/images/a.png')} style={{width: 80, height: 80}}/>
              <Text>A-type</Text>
            </View>
            <View style={styles.shellItem}>
              <Image source={require('../../assests/images/f.png')} style={{width: 80, height: 80}}/>
              <Text>F-type</Text>
            </View>
            <View style={styles.shellItem}>
              <Image source={require('../../assests/images/m.png')} style={{width: 80, height: 80}}/>
              <Text>M-type</Text>
            </View>
          </View>
          <CalcInput label='Preset Configuration' placeholder='Acceptable Fouling' change='' value='Default config'/>
          <CollapsePanel panelName='Shell-side'>
          <View>
              <CalcInput label='Mass Flow Rate' placeholder='Mass Flow Rate' change={value => this.inputChangedHandler(value, 'tsMassFlow')} value={this.state.sizingInput.ssMassFlow}/>
              <CalcInput label='Inlet Temp' placeholder='Inlet Temp' change={value => this.inputChangedHandler(value, 'tsInletTemp')} value={this.state.sizingInput.ssInletTemp}/>
              <CalcInput label='Outlet Temp' placeholder='Outlet Temp' change={value => this.inputChangedHandler(value, 'tsOutletTemp')} value={this.state.sizingInput.ssOutletTemp}/>
              <CalcInput label='Heat Capacity' placeholder='Heat Capacity' change={value => this.inputChangedHandler(value, 'tsHeatCap')} value={this.state.sizingInput.ssHeatCap}/>
          </View>
          </CollapsePanel>
          <CollapsePanel panelName='Tube-side'>
            <View>
              <CalcInput label='Mass Flow Rate' placeholder='Mass Flow Rate' change={value => this.inputChangedHandler(value, 'tsMassFlow')} value={this.state.sizingInput.tsMassFlow}/>
              <CalcInput label='Inlet Temp' placeholder='Inlet Temp' change={value => this.inputChangedHandler(value, 'tsInletTemp')} value={this.state.sizingInput.tsInletTemp}/>
              <CalcInput label='Outlet Temp' placeholder='Outlet Temp' change={value => this.inputChangedHandler(value, 'tsOutletTemp')} value={this.state.sizingInput.tsOutletTemp}/>
              <CalcInput label='Heat Capacity' placeholder='Heat Capacity' change={value => this.inputChangedHandler(value, 'tsHeatCap')} value={this.state.sizingInput.tsHeatCap}/>
              <CalcInput label='Fluid Velocity' placeholder='Fluid Velocity' change={value => this.inputChangedHandler(value, 'tsVelocity')} value={this.state.sizingInput.tsVelocity}/>
              <CalcInput label='Fluid Density' placeholder='Fluid Density' change={value => this.inputChangedHandler(value, 'tsDensity')} value={this.state.sizingInput.tsDensity}/>
            </View>
          </CollapsePanel>
          <CollapsePanel panelName='Physical Properties'>
            <View>
              <CalcInput label='Tube Pitch' placeholder='Tube Pitch' change={value => this.inputChangedHandler(value, 'tubePitch')} value={this.state.sizingInput.tubePitch}/>
              <CalcInput label='Tube Layout' placeholder='Tube Layout' change={value => this.inputChangedHandler(value, 'tubeLayout')} value={this.state.sizingInput.tubeLayout}/>
              <CalcInput label='Tube Inner Diameter' placeholder='Tube Inner Diameter' change={value => this.inputChangedHandler(value, 'innerD')} value={this.state.sizingInput.innerD}/>
              <CalcInput label='Tube Outer Diameter' placeholder='Tube Outer Diameter' change={value => this.inputChangedHandler(value, 'outerD')} value={this.state.sizingInput.outerD}/>
              <CalcInput label='Number of Passes' placeholder='Number of Passes' change={value => this.inputChangedHandler(value, 'noPasses')} value={this.state.sizingInput.noPasses}/>
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
      sizing: state.sizing,
  };
};

// dispatch will be called when the function is called
const mapDispatchToProps = dispatch =>{
  return {
      savePlanToStore: (name, details) => dispatch(saveSizing(name, details)),
      genPlan: (name, details) => dispatch(genSizing(name, details))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(CalculateSizing);