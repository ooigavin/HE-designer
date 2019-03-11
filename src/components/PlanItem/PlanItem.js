import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const planItem = (props) => {

  return (
    <TouchableOpacity onPress={props.onItemPressed}>
      <View style={styles.planItem}>
        <Text style={styles.planName}>{props.planName}</Text>
        <TouchableOpacity onPress={props.view}>
          <Icon size={30} name="md-eye-off" style={styles.plusIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={props.edit}>
          <Icon size={30} name="md-create" color="green" style={styles.plusIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={props.delete}>
          <Icon size={30} name="ios-trash" color="red" style={styles.plusIcon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  planItem: {
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
  },
  planName: {
    flexGrow: 1
  }
});

export default planItem;