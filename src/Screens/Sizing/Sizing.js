import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

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
              title: {text: 'Sizing Calculations'},
              leftButtons: [{
                id:'calculationBack',
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
      <View style={styles.sizingContainer}>
        <PlanItem planName='Sizing Plan 1' onItemPressed={this.openCalc}/>
        <TouchableOpacity style={styles.addButton}>
          <Icon name='md-add-circle-outline' size={45} color='green'/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sizingContainer: {
    width: '90%',
    height:'100%',
    marginLeft: 10,
    marginTop: 10,
    alignItems: 'center'
  },
  addButton: {
    position: 'absolute',
    bottom: 15,
    right: 10
  }
});

export default Sizing;