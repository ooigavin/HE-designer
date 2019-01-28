import React, {Component} from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Navigation } from 'react-native-navigation';

import GuidelineItem from '../../components/GuidelineItem/GuidelineItem';
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
          <GuidelineItem guidelineName='Tube Layout' />
          <GuidelineItem guidelineName='Shell Type' />
          <GuidelineItem guidelineName='Fluid Properties' />
          <GuidelineItem guidelineName='Fouling' />
          <GuidelineItem guidelineName='Flow-Induced Vibration' />
          <GuidelineItem guidelineName='Tube Length' />
        </View>
      </ScrollView>      
    );
  }
}

const styles = StyleSheet.create({
  guidelineContainer: {
    width: '90%',
    marginLeft: 10,
    marginTop: 10
  }
});

export default Guidelines;