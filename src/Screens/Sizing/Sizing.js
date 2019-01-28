import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation'; 

import PlanItem from '../../components/PlanItem/PlanItem';

class Sizing extends Component {

  constructor(props) {
    super(props);
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'infoButton') {
      alert('Helper info for sizing tab')
    }
  }

  render() {
    return (
      <View style={styles.sizingContainer}>
        <PlanItem planName='Sizing Plan 1' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sizingContainer: {
    width: '90%',
    marginLeft: 10,
    marginTop: 10
  }
});

export default Sizing;