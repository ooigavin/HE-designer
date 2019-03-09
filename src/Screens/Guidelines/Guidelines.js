import React, {Component} from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';

import CollapsePanel from '../../UI/CollapsePanel/CollapsePanel';
import Header from '../../UI/Header/Header';

class Guidelines extends Component {

  constructor(props) {
    super(props);
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'infoButton') {
      alert('Helper info for guidelines tab')
        }
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.guidelineContainer}>
          <CollapsePanel panelName='Tube Layout'><Text>Tube Layout</Text></CollapsePanel>
          <CollapsePanel panelName='Shell Type'><Text>Shell Type</Text></CollapsePanel>
          <CollapsePanel panelName='Fluid Properties'><Text>Fluid Properties</Text></CollapsePanel>
          <CollapsePanel panelName='Fouling'><Text>Fouling</Text></CollapsePanel>
          <CollapsePanel panelName='Flow-Induced Vibration'><Text>Flow-Induced Vibration</Text></CollapsePanel>
          <CollapsePanel panelName='Tube Length'><Text>Tube Length</Text></CollapsePanel>
        </View>
      </ScrollView>      
    );
  }
}

const styles = StyleSheet.create({
  guidelineContainer: {
    width: '90%',
    marginLeft: 10,
    marginTop: 10,
    alignItems:'center'
  }
});

export default Guidelines;