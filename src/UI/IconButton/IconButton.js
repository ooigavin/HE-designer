import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const iconButtons = (props) => {

  return (
      <TouchableOpacity onPress={props.onPress}>
        <View style={[styles.buttonContainer, {backgroundColor: props.bgColor}]}>
          <Icon name={props.iconName} size={props.iconSize}/>
          <Text>{props.children}</Text>
        </View>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 10,
    alignItems: 'center',
    borderRadius: 5,
    width: '100%'
  }
});


export default iconButtons;