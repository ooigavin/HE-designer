import React, {Component} from 'react';
import { ScrollView, StyleSheet, View} from 'react-native';

import GuidelineItem from '../../components/GuidelineItem/GuidelineItem';
import Header from '../../UI/Header/Header';

class Guidelines extends Component {

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