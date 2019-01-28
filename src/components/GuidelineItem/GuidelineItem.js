import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const guidelineItem = (props) => {

  return (
    <TouchableOpacity onPress={props.onItemPressed}>
      <View style={styles.guidelineItem}>
        <Icon size={27} name="md-arrow-dropdown-circle" color="#99E0E7" style={styles.plusIcon}/>
        <Text>{props.guidelineName}</Text>
      </View>
    </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  guidelineItem: {
    width: "100%",
    padding: 10,
    backgroundColor: "#eee",
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center"
  },
  plusIcon: {
    marginRight: 8,
    height: 30,
    width: 30
  }
});

export default guidelineItem;