import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
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
    const htmlContent = `
<h1>${this.props.planName}</h1>
<img src="file:////storage/7E3B-15E6/Android/data/com.hedesigner/he.png"/>
<h3>Input Parameters</h3>
<table cellpadding="10" border="1|0">
  <tr>
      <th>Fluid Parameters</th>
      <th>Shell-Side</th>
      <th>Tube-Side</th>
  </tr>
  <tr>
      <td>Inlet Temperature</td>
      <td>35</td>
      <td>20</td>
  </tr>
  <tr>
      <td>Outlet Temperature</td>
      <td>25</td>
      <td>25</td>
  </tr>
  <tr>
      <td>Mass Flow Rate</td>
      <td>80,000</td>
      <td>140,000</td>
  </tr>
  <tr>
      <td>Specific Heat Capacity</td>
      <td>4178.5</td>
      <td>4179</td>
  </tr>
  <tr>
      <td>Dynamic Viscosity</td>
      <td>0.000797</td>
      <td>0.00095</td>
  </tr>
  <tr>
      <td>Thermal Conductivity</td>
      <td>0.614</td>
      <td>0.6065</td>
  </tr>
  <tr>
      <td>Prandtl Number</td>
      <td>5.43</td>
      <td>6.55</td>
  </tr>
  <tr>
      <td>Density</td>
      <td>995.7</td>
      <td>997</td>
  </tr>
</table>
<h3>Sizing Results</h3>
<table cellpadding="10" border="1|0">
  <tr>
      <th>Parameters</th>
      <th>Results</th>
  </tr>
  <tr>
      <td>Tube-side heat transfer coefficient</td>
      <td>4871</td>
  </tr>
  <tr>
      <td>Tube-side pressure drop</td>
      <td>95,770</td>
  </tr>
  <tr>
      <td>Shell-side heat transfer coefficient</td>
      <td>4,469</td>
  </tr>
  <tr>
      <td>Shell-side pressure drop</td>
      <td>61,180</td>
  </tr>
</table>
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