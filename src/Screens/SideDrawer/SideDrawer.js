import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

class SideDrawer extends Component {

  openRating = () => {
    console.log(this.props.componentId)
    Promise.all([
      Icon.getImageSource('md-arrow-back', 30)
    ]).then(sources => {
      Navigation.push(this.props.componentId, {
        component: {
          name: 'he-designer.RatingPresetScreen',
          passProps: {
            planName: 'name'
          },
          options: {
            topBar: {
              title: { text: 'Rating Presets' },
              leftButtons: [{
                id: 'presetBack',
                icon: sources[0]
              }]
            }
          }
        }
      });
    });
  };

  render () {
    return(
      <View style={styles.container}>
        <Text style={styles.title}>HE Designer Settings</Text>
        <TouchableOpacity onPress={this.openRating}>
          <View style={styles.planItem}>
            <Text>Rating Presets</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.planItem}>
            <Text>Sizing Presets</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    paddingLeft: 10,
    backgroundColor: 'white',
    flex: 1
  },planItem: {
    width: "100%",
    padding: 10,
    backgroundColor: "#eee",
    margin: 5,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    color: 'blue',
    fontSize: 20,
    marginBottom: 15,
  }
});

export default SideDrawer;