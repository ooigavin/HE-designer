import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native'

class SideDrawer extends Component {

  render () {
    return(
      <View style={styles.container}>
        <Text>Side drawer content here</Text>
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
  }
});

export default SideDrawer;