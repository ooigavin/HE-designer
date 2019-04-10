import React, {Component} from 'react';
import { ScrollView, StyleSheet, View, Text, Image } from 'react-native';
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
          <CollapsePanel panelName='Tube Layout'><Image source={require('../../assests/images/tubeLayouts.png')} style={{width: 250, height: 250, flex:1, resizeMode:'contain'}}/></CollapsePanel>
          <CollapsePanel panelName='Shell Type'><Image source={require('../../assests/images/temashelltypes.png')} style={{width: 300, height: 400, flex:1, resizeMode:'contain'}}/></CollapsePanel>
          <CollapsePanel panelName='Flow-Induced Vibration'><Text>Flow induced vibrations are widely recognized as a major concern in the design of modern tube-and-shell heat exchangers. These problems are especially acute in nuclear steam generators where it has become rather commonplace to shut down nuclear power stations in order to effect very expensive repairs to leaking tubes. While some tube failures occur due to fatigue or thinning and splitting at mid-span as a result of tube-to-tube clashing, most failures are due to fretting wear at the tube supports. Problems typically arise in U-bend regions, where the tube natural frequencies tend to be low, or in areas producing localized high velocities such as entrance and exit nozzles, baffle plates or open tube lanes. These tube failures are invariably associated with high velocity cross-flows</Text></CollapsePanel>
          <CollapsePanel panelName='Fluid Properties'><Text>Fluid Properties</Text></CollapsePanel>
          <CollapsePanel panelName='Fouling'><Text>Fouling</Text></CollapsePanel>
          <CollapsePanel panelName='Tube Length'><Text>Tube Length</Text></CollapsePanel>
          <CollapsePanel panelName='Kern Method'><Text>Kern Method</Text></CollapsePanel>
          <CollapsePanel panelName='Bell Delaware Method'><Text>Bell Delaware Method</Text></CollapsePanel>
          <CollapsePanel panelName='Material Properties'><Text>Material Properties</Text></CollapsePanel>
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