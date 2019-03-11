import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { Navigation } from 'react-native-navigation';

import CollapsePanel from '../../UI/CollapsePanel/CollapsePanel';
import IconButton from '../../UI/IconButton/IconButton';
import CalcInput from '../../../UI/CalcInput/CalcInput';

class CalculateSizing extends Component {

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

  render() {
    return (
      <ScrollView>
        <View style={styles.sizingContainer}>
          <CollapsePanel panelName='Shell-side'>
          <View>
            <CalcInput label='Pressure Drop' placeholder='Pressure Drop' />
            <CalcInput label='Mass Flow Rate' placeholder='Mass Flow Rate' />
            <CalcInput label='Inlet Temp' placeholder='Inlet Temp' />
            <CalcInput label='Outlet Temp' placeholder='Outlet Temp' />
            <CalcInput label='Fluid Type' placeholder='Fluid Type' />
          </View>
          </CollapsePanel>
          <CollapsePanel panelName='Tube-side'>
            <View>
              <CalcInput label='Mass Flow Rate' placeholder='Mass Flow Rate' />
              <CalcInput label='Inlet Temp' placeholder='Inlet Temp' />
              <CalcInput label='Outlet Temp' placeholder='Outlet Temp' />
              <CalcInput label='Fluid Type' placeholder='Fluid Type' />
            </View>
          </CollapsePanel>
          <CollapsePanel panelName='Materials'>
            <View>
              <CalcInput label='Shell-Side Material' placeholder='Shell-Side Material' />
              <CalcInput label='Tube-Side Material' placeholder='Tube-Side Material' />
            </View>
          </CollapsePanel>
          <CollapsePanel panelName='Fouling'>
            <View>
              <CalcInput label='Acceptable Fouling' placeholder='Acceptable Fouling' />
              <CalcInput label='Hrs of Use (Daily)' placeholder='Hrs of Use (Daily)' />
              <CalcInput label='Acceptable Lifespan' placeholder='Acceptable Lifespan' />
            </View>
          </CollapsePanel>
        </View>
        <View style={styles.buttonContainer}>
          <IconButton bgColor='#99E0E7' iconName='md-save' iconSize={30}>Save</IconButton>
          <IconButton bgColor='#99E0E7' iconName='md-download' iconSize={30}>Generate Report</IconButton>
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
      addPlan: (planName) => dispatch(addSizing(planName)),
      delPlan: () => dispatch({type: actionTypes.DEL_SIZING})
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(CalculateSizing);