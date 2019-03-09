import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { Navigation } from 'react-native-navigation';

import CollapsePanel from '../../UI/CollapsePanel/CollapsePanel';
import IconButton from '../../UI/IconButton/IconButton';

import TSInput from '../../components/Sizing/TubeSide/tubeSideSizingInput';
import SSInput from '../../components/Sizing/ShellSide/shellSideSizingInput';
import FoulingInput from '../../components/Sizing/Fouling/foulingSizingInput';
import MaterialsInput from '../../components/Sizing/Materials/materialsSizingInput';

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
          <CollapsePanel panelName='Shell-side'><SSInput/></CollapsePanel>
          <CollapsePanel panelName='Tube-side'><TSInput/></CollapsePanel>
          <CollapsePanel panelName='Materials'><MaterialsInput/></CollapsePanel>
          <CollapsePanel panelName='Fouling'><FoulingInput/></CollapsePanel>
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

export default CalculateSizing;