import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import PlanItem from '../../components/PlanItem/PlanItem';

class Rating extends Component {

  render() {
    return (
      <View style={styles.ratingContainer}>
        <PlanItem planName='Rating Plan 1' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ratingContainer: {
    width: '90%',
    marginLeft: 10,
    marginTop: 10
  }
});

export default Rating;