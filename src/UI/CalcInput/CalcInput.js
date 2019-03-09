import React from 'react';
import {StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const calcInput = (props) => {

  return (
    <View style={styles.inputContainer}>
      < TouchableOpacity>
        <Text>
          {props.label} <Icon name='md-information-circle-outline' size={20} style={styles.infoIcon} /> : 
        </Text>
      </TouchableOpacity>
      <TextInput placeholder={props.placeholder} style={styles.textInput}/>
    </View>
  );
};

styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    margin: 2,
    alignItems: 'center',
    padding:2
  },
  textInput: {
    flex: 1,
    borderBottomColor: 'black',
    borderBottomWidth:1,
    paddingBottom:0
  },
  infoIcon: {
    marginTop: 2
  }
})

export default calcInput;