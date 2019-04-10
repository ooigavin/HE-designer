import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { Navigation } from 'react-native-navigation';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import {saveRating, genRating} from '../../store/actions/ratingActions';

import CollapsePanel from '../../UI/CollapsePanel/CollapsePanel';
import IconButton from '../../UI/IconButton/IconButton';
import CalcInput from '../../UI/CalcInput/CalcInput';

class CalculateRating extends Component {

  state = {
    ratingInput: {
      ssPressureDrop: this.props.rating.planDetails[this.props.planName].ssPressureDrop,
      ssMassFlow: this.props.rating.planDetails[this.props.planName].ssMassFlow,
      ssInletTemp: this.props.rating.planDetails[this.props.planName].ssInletTemp,
      ssOutletTemp:this.props.rating.planDetails[this.props.planName].ssOutletTemp,
      ssFluidType: this.props.rating.planDetails[this.props.planName].ssFluidType,
      tsMassFlow: this.props.rating.planDetails[this.props.planName].tsMassFlow,
      tsInletTemp: this.props.rating.planDetails[this.props.planName].tsInletTemp,
      tsOutletTemp: this.props.rating.planDetails[this.props.planName].tsOutletTemp,
      tsFluidType: this.props.rating.planDetails[this.props.planName].tsFluidType,
      ssMaterial: this.props.rating.planDetails[this.props.planName].ssMaterial,
      tsMaterial: this.props.rating.planDetails[this.props.planName].tsMaterial,
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
    console.log(this.props.planName)
    console.log(this.state.ratingInput)
    this.props.savePlanToStore(this.props.planName, this.state.ratingInput)
  };

  generateReport = () => {
    const htmlContent = `
<h1>${this.props.planName}</h1>
<img src="file:////storage/7E3B-15E6/Android/data/com.hedesigner/he.png"/>
<h3>Input Parameters</h3>
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
    this.props.genPlan(this.props.planName, this.state.ratingInput)

  };

  render() {
    console.log(this.props.planName)
    console.log(this.props.rating.planDetails[this.props.planName])
    return (
      <ScrollView>
        <View style={styles.sizingContainer}>
          <CollapsePanel panelName='Shell-side'>
          <View>
            <CalcInput label='Pressure Drop' placeholder='Pressure Drop' change={value => this.inputChangedHandler(value, 'ssPressureDrop')} value={this.state.ratingInput.ssPressureDrop}/>
            <CalcInput label='Mass Flow Rate' placeholder='Mass Flow Rate' change={value => this.inputChangedHandler(value, 'ssMassFlow')} value={this.state.ratingInput.ssMassFlow}/>
            <CalcInput label='Inlet Temp' placeholder='Inlet Temp' change={value => this.inputChangedHandler(value, 'ssInletTemp')} value={this.state.ratingInput.ssInletTemp}/>
            <CalcInput label='Outlet Temp' placeholder='Outlet Temp' change={value => this.inputChangedHandler(value, 'ssOutletTemp')} value={this.state.ratingInput.ssOutletTemp}/>
            <CalcInput label='Fluid Type' placeholder='Fluid Type' change={value => this.inputChangedHandler(value, 'ssFluidType')} value={this.state.ratingInput.ssFluidType}/>
          </View>
          </CollapsePanel>
          <CollapsePanel panelName='Tube-side'>
            <View>
              <CalcInput label='Mass Flow Rate' placeholder='Mass Flow Rate' change={value => this.inputChangedHandler(value, 'tsMassFlow')} value={this.state.ratingInput.tsMassFlow}/>
              <CalcInput label='Inlet Temp' placeholder='Inlet Temp' change={value => this.inputChangedHandler(value, 'tsInletTemp')} value={this.state.ratingInput.tsInletTemp}/>
              <CalcInput label='Outlet Temp' placeholder='Outlet Temp' change={value => this.inputChangedHandler(value, 'tsOutletTemp')} value={this.state.ratingInput.tsOutletTemp}/>
              <CalcInput label='Fluid Type' placeholder='Fluid Type' change={value => this.inputChangedHandler(value, 'tsFluidType')} value={this.state.ratingInput.tsFluidType}/>
            </View>
          </CollapsePanel>
          <CollapsePanel panelName='Materials'>
            <View>
              <CalcInput label='Shell-Side Material' placeholder='Shell-Side Material' change={value => this.inputChangedHandler(value, 'ssMaterial')} value={this.state.ratingInput.ssMaterial}/>
              <CalcInput label='Tube-Side Material' placeholder='Tube-Side Material' change={value => this.inputChangedHandler(value, 'tsMaterial')} value={this.state.ratingInput.tsMaterial}/>
            </View>
          </CollapsePanel>
          <CollapsePanel panelName='Fouling'>
            <View>
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