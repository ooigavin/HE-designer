import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import PlanItem from '../../components/PlanItem/PlanItem';

class Sizing extends Component {

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