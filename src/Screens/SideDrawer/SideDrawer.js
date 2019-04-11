import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

class SideDrawer extends Component {

  render () {
    return(
      <View style={styles.container}>
        <Text style={styles.title}>HE Designer Settings</Text>
        <TouchableOpacity>
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