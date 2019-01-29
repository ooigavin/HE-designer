import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import PlanItem from '../../components/PlanItem/PlanItem';

class Rating extends Component {

  constructor(props) {
    super(props);
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'infoButton') {
      alert('Helper info for ratings tab')
    }
  }

  openCalc = () => {
    Promise.all([
      Icon.getImageSource('md-arrow-back', 30)
    ]).then(sources => {
      Navigation.push(this.props.componentId, {
        component: {
          name: 'he-designer.SizingCalcScreen',
          passProps: {
            selectedPlace: 'hello'
          },
          options: {
            topBar: {
              title: { text: 'Sizing Calculations' },
              leftButtons: [{
                id: 'calculationBack',
                icon: sources[0]
              }]
            }
          }
        }
      });
    });
  }

  render() {
    return (
      <View style={styles.ratingContainer}>
        <PlanItem planName='Rating Plan 1' onItemPressed={this.openCalc}/>
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