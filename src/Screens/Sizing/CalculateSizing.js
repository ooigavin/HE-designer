import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ScrollView, Button, Image } from 'react-native';
import { Navigation } from 'react-native-navigation';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import {saveSizing} from '../../store/actions/sizingActions';

import CollapsePanel from '../../UI/CollapsePanel/CollapsePanel';
import IconButton from '../../UI/IconButton/IconButton';
import CalcInput from '../../UI/CalcInput/CalcInput';
import HEImage from '../../assests/images/HE.png';

class CalculateSizing extends Component {

  state = {
    sizingInput: {
      ssPressureDrop: this.props.sizing.planDetails[this.props.planName].ssPressureDrop,
      ssMassFlow: this.props.sizing.planDetails[this.props.planName].ssMassFlow,
      ssInletTemp: this.props.sizing.planDetails[this.props.planName].ssInletTemp,
      ssOutletTemp:this.props.sizing.planDetails[this.props.planName].ssOutletTemp,
      ssFluidType: this.props.sizing.planDetails[this.props.planName].ssFluidType,
      tsMassFlow: this.props.sizing.planDetails[this.props.planName].tsMassFlow,
      tsInletTemp: this.props.sizing.planDetails[this.props.planName].tsInletTemp,
      tsOutletTemp: this.props.sizing.planDetails[this.props.planName].tsOutletTemp,
      tsFluidType: this.props.sizing.planDetails[this.props.planName].tsFluidType,
      ssMaterial: this.props.sizing.planDetails[this.props.planName].ssMaterial,
      tsMaterial: this.props.sizing.planDetails[this.props.planName].tsMaterial,
      acceptableFouling: this.props.sizing.planDetails[this.props.planName].acceptableFouling,
      dailyUsage: this.props.sizing.planDetails[this.props.planName].dailyUsage,
      acceptableLifespan: this.props.sizing.planDetails[this.props.planName].acceptableLifespan
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
    console.log(this.props.planName)
    console.log(this.state.sizingInput)
    this.props.savePlanToStore(this.props.planName, this.state.sizingInput)
  };

  generateReport = () => {
    const htmlContent = `<div>
    <h2 style="margin-bottom: 0;margin-left: 10;color: #59C6D1">Plan Name</h2>
    <table cellpadding="10">
        <tr valign='top'>
`
    let options = {
      html: htmlContent,
      fileName: this.props.planName,
      directory: 'Documents'
    };
    console.log(htmlContent)
    RNHTMLtoPDF.convert(options).then(filePath => {
      console.log('PDF generated', filePath);
    
    });

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
            <CalcInput label='Pressure Drop' placeholder='Pressure Drop' change={value => this.inputChangedHandler(value, 'ssPressureDrop')} value={this.state.sizingInput.ssPressureDrop}/>
            <CalcInput label='Mass Flow Rate' placeholder='Mass Flow Rate' change={value => this.inputChangedHandler(value, 'ssMassFlow')} value={this.state.sizingInput.ssMassFlow}/>
            <CalcInput label='Inlet Temp' placeholder='Inlet Temp' change={value => this.inputChangedHandler(value, 'ssInletTemp')} value={this.state.sizingInput.ssInletTemp}/>
            <CalcInput label='Outlet Temp' placeholder='Outlet Temp' change={value => this.inputChangedHandler(value, 'ssOutletTemp')} value={this.state.sizingInput.ssOutletTemp}/>
            <CalcInput label='Fluid Type' placeholder='Fluid Type' change={value => this.inputChangedHandler(value, 'ssFluidType')} value={this.state.sizingInput.ssFluidType}/>
          </View>
          </CollapsePanel>
          <CollapsePanel panelName='Tube-side'>
            <View>
              <CalcInput label='Mass Flow Rate' placeholder='Mass Flow Rate' change={value => this.inputChangedHandler(value, 'tsMassFlow')} value={this.state.sizingInput.tsMassFlow}/>
              <CalcInput label='Inlet Temp' placeholder='Inlet Temp' change={value => this.inputChangedHandler(value, 'tsInletTemp')} value={this.state.sizingInput.tsInletTemp}/>
              <CalcInput label='Outlet Temp' placeholder='Outlet Temp' change={value => this.inputChangedHandler(value, 'tsOutletTemp')} value={this.state.sizingInput.tsOutletTemp}/>
              <CalcInput label='Fluid Type' placeholder='Fluid Type' change={value => this.inputChangedHandler(value, 'tsFluidType')} value={this.state.sizingInput.tsFluidType}/>
            </View>
          </CollapsePanel>
          <CollapsePanel panelName='Materials'>
            <View>
              <CalcInput label='Shell-Side Material' placeholder='Shell-Side Material' change={value => this.inputChangedHandler(value, 'ssMaterial')} value={this.state.sizingInput.ssMaterial}/>
              <CalcInput label='Tube-Side Material' placeholder='Tube-Side Material' change={value => this.inputChangedHandler(value, 'tsMaterial')} value={this.state.sizingInput.tsMaterial}/>
            </View>
          </CollapsePanel>
          <CollapsePanel panelName='Fouling'>
            <View>
              <CalcInput label='Acceptable Fouling' placeholder='Acceptable Fouling' change={value => this.inputChangedHandler(value, 'acceptableFouling')} value={this.state.sizingInput.acceptableFouling}/>
              <CalcInput label='Hrs of Use (Daily)' placeholder='Hrs of Use (Daily)' change={value => this.inputChangedHandler(value, 'dailyUsage')} value={this.state.sizingInput.dailyUsage}/>
              <CalcInput label='Acceptable Lifespan' placeholder='Acceptable Lifespan' change={value => this.inputChangedHandler(value, 'acceptableLifespan')} value={this.state.sizingInput.acceptableLifespan}/>
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
      savePlanToStore: (name, details) => dispatch(saveSizing(name, details))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(CalculateSizing);